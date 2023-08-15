import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import mongodb, { MongoClient } from "mongodb";

// const Dummy_MeetUps = [
//   {
//     id: "m1",
//     title: " A First Meetup ",
//     image:
//       "https://lookahead.com.au/assets/blog/_1200x628_crop_center-center_82_line/meetups.jpg",
//     address: "ABC 5 , South City 78975 ",
//     description: "This is the first meet up!",
//   },
//   {
//     id: "m2",
//     title: " A Second Meetup ",
//     image:
//       "https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.webp",
//     address: "SSSS 5 , South City 78975 ",
//     description: "This is the Second meet up!",
//   },
//   {
//     id: "m3",
//     title: " A Third Meetup ",
//     image:
//       "https://wallpapers.com/images/hd/glamorous-mountain-nature-view-5zvjo2ypc8wic0uj.webp",
//     address: "Santa 9 , North City 5674566 ",
//     description: "This is the Third meet up!",
//   },
// ];
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups "
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://Athipython:twmE5fn6eWqn6gYx@cluster0.jnw4ana.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((item) => ({
        title: item.title,
        address: item.address,
        image: item.image,
        description: item.description,
        id: item._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
