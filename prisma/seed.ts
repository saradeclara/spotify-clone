import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const seedData = [
  {
    name: "Soundgarden",
    albums: [
      {
        name: "Badmotorfinger",
        songs: [
          { albumIndex: 1, name: "Rusty Cage", url: "", duration: 123 },
          { albumIndex: 2, name: "Outshined", url: "", duration: 123 },
          {
            albumIndex: 3,
            name: "Slaves & Bulldozers",
            url: "",
            duration: 123,
          },
          { albumIndex: 4, name: "Jesus Christ Pose", url: "", duration: 123 },
          { albumIndex: 5, name: "Face Pollution", url: "", duration: 123 },
          { albumIndex: 6, name: "Somewhere", url: "", duration: 123 },
          {
            albumIndex: 7,
            name: "Searching with My Good Eye Closed",
            url: "",
            duration: 123,
          },
          {
            albumIndex: 8,
            name: "Room a Thousand Years Wide",
            url: "",
            duration: 123,
          },
          { albumIndex: 9, name: "Mind Riot", url: "", duration: 123 },
          { albumIndex: 10, name: "Drawing Flies", url: "", duration: 123 },
          { albumIndex: 11, name: "Holy Water", url: "", duration: 123 },
          { albumIndex: 12, name: "New Damage", url: "", duration: 123 },
        ],
      },
    ],
  },
  {
    name: "Pearl Jam",
    albums: [
      {
        name: "Ten",
        songs: [
          { albumIndex: 1, name: "Once", url: "", duration: 123 },
          { albumIndex: 2, name: "Even Flow", url: "", duration: 123 },
          { albumIndex: 3, name: "Alive", url: "", duration: 123 },
          { albumIndex: 4, name: "Why Go", url: "", duration: 123 },
          { albumIndex: 5, name: "Black", url: "", duration: 123 },
          { albumIndex: 6, name: "Jeremy", url: "", duration: 123 },
          { albumIndex: 7, name: "Oceans", url: "", duration: 123 },
          { albumIndex: 8, name: "Porch", url: "", duration: 123 },
          { albumIndex: 9, name: "Garden", url: "", duration: 123 },
          { albumIndex: 10, name: "Deep", url: "", duration: 123 },
          { albumIndex: 11, name: "Release", url: "", duration: 123 },
        ],
      },
    ],
  },
];

// const seedData = [
//   {
//     name: "Depeche Mode",
//     albums: [
//       {
//         name: "Violator",
//         songs: [
//           {
//             albumIndex: 1,
//             name: "World In My Eyes",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 2,
//             name: "Sweetest Perfection",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 3,
//             name: "Personal Jesus",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 4,
//             name: "Halo",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 5,
//             name: "Waiting For The Night",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 6,
//             name: "Enjoy the Silence",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 7,
//             name: "Policy of Truth",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 8,
//             name: "Blue Dress",
//             url: "",
//             duration: 123,
//           },
//           {
//             albumIndex: 9,
//             name: "Clean",
//             url: "",
//             duration: 123,
//           },
//         ],
//       },
//     ],
//   },
// ];

const seedNewUsers = [
  {
    firstName: "Sara",
    lastName: "De Clara",
    email: "saradeclara@gmail.com",
    password: "password",
    isAdmin: true,
  },
];

const updateUser = {
  firstName: "Sara",
  lastName: "De Clara",
  email: "saradeclara@gmail.com",
  password: "password",
  isAdmin: true,
  favouriteSongs: [],
};

// UPDATE SONG DURATION
// const main = async () => {
//   const allSongs = await prisma.song.findMany({});

//   allSongs.map(async (currentSong) => {
//     const updatedSong = await prisma.song.updateMany({
//       where: { id: currentSong.id },
//       data: {
//         url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=0",
//       },
//     });

//     console.log({ updatedSong });
//   });
// };

// UPDATE USER
const main = async () => {
  const currentUser = await prisma.user.findFirst({
    where: { email: "saradeclara@gmail.com" },
  });

  const salt = bcrypt.genSaltSync();

  if (currentUser) {
    const updatedUser = await prisma.user.update({
      where: { email: updateUser.email },
      data: {
        password: bcrypt.hashSync(currentUser?.password, salt),
      },
    });
    console.log({ updatedUser });
  }

  console.log({ currentUser });
};

// CREATE USERS
// const main = async () => {
//   await Promise.all(
//     seedNewUsers.map(async (currentUser) => {
//       const newUser = await prisma.user.upsert({
//         where: { email: currentUser.email },
//         update: {},
//         create: {
//           firstName: currentUser.firstName,
//           lastName: currentUser.lastName,
//           email: currentUser.email,
//           password: currentUser.password,
//           isAdmin: currentUser.isAdmin,
//         },
//       });
//       console.log({ newUser });
//     })
//   );
// };

// CREATE ARTIST, ALBUMS AND SONGS
// const main = async () => {
//   await Promise.all(
//     seedData.map(async (currentArtist) => {
//       const newArtist = await prisma.artist.create({
//         data: { name: currentArtist.name },
//       });

//       console.log({ newArtist });

//       currentArtist.albums.map(async (singleAlbum) => {
//         const newAlbum = await prisma.album.create({
//           data: { name: singleAlbum.name, artistId: newArtist.id },
//         });

//         console.log({ newAlbum });

//         singleAlbum.songs.map(async (singleSong) => {
//           const newSong = await prisma.song.create({
//             data: {
//               name: singleSong.name,
//               albumIndex: singleSong.albumIndex,
//               url: singleSong.url,
//               duration: singleSong.duration,
//               albumId: newAlbum.id,
//               artistId: newArtist.id,
//             },
//           });

//           console.log({ newSong });
//         });
//       });
//     })
//   );
// };

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
