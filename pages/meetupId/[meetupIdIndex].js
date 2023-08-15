import React from "react";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

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

const meetupIdIndex = (props) => {
  const router = useRouter();

  const meetupId = router.query.meetupIdIndex;

  // console.log("id", meetupId);

  // console.log("teamdata", teamData);
  return (
    <Fragment>
      {/* {teamData && ( */}
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetails>
      {/* )} */}
    </Fragment>
  );
};

export async function getStaticPaths() {
  // get data from backend

  const client = await MongoClient.connect(
    "mongodb+srv://Athipython:twmE5fn6eWqn6gYx@cluster0.jnw4ana.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((item) => ({
      params: { meetupIdIndex: item._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for single meetup

  const meetupId = context.params.meetupIdIndex;

  // get data from backend

  const client = await MongoClient.connect(
    "mongodb+srv://Athipython:twmE5fn6eWqn6gYx@cluster0.jnw4ana.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
  };
}

export default meetupIdIndex;
