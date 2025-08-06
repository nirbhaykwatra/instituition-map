import postgres from "postgres";
import fs from "fs";
import { config } from "dotenv";
import path from "path";

const schools = [
    {
        name: "Mountainside Secondary",
        tags: "School",
        type: "school",
        address: "3365 Mahon Avenue North Vancouver BC",
        district: 44,
        requests: ["Request 1", "Request 2"],
        programs: ["Program 1"],
        position: {
            lat: 49.34035303968323,
            lng: -123.08051030146905
        }
    },
    {
        name: "Handsworth Secondary",
        tags: "School",
        type: "school",
        address: "1033 Handsworth Road North Vancouver BC",
        district: 44,
        requests: ["Request 1", "Request 2"],
        programs: ["Program 1"],
        position: {
            lat: 49.35242802064235,
            lng: -123.10137877302783
        }
    },
    {
        name: "Carson Graham Secondary",
        tags: "School",
        type: "school",
        address: "2145 Jones Avenue North Vancouver BC",
        district: 44,
        requests: ["Request 1", "Request 2"],
        programs: ["Program 1"],
        position: {
            lat: 49.329127965950505,
            lng: -123.08180647510146
        }
    },
    {
        name: "Argyle Secondary",
        tags: "School",
        type: "school",
        address: "1131 Frederick Road North Vancouver BC",
        district: 44,
        requests: ["Request 1", "Request 2"],
        programs: ["Program 1"],
        position: {
            lat: 49.3416081277803,
            lng: -123.04200298546256
        }
    }
];
const industryPartners = [
    {
        name: "Elk Valley Resources",
        tags: "Industry Partner",
        type: "industry",
        address: "565 Michel Creek Rd, Sparwood, BC",
        programs: ["Program 1"],
        contact: "Jay Weldon",
        position: {
            lat: 49.743664238353965,
            lng: -114.8768418788194
        }
    },
    {
        name: "BC Wildlife Federation",
        tags: "Industry Partner",
        type: "industry",
        address: "9706 188 St, Surrey, BC",
        programs: ["Program 1"],
        contact: "Arielle Garsson",
        position: {
            lat: 49.178792439098864,
            lng: -122.70057571001746
        }
    },
    {
        name: "Entuitive Consulting",
        tags: "Industry Partner",
        type: "industry",
        address: "1075 W Georgia St Suite 1020, Vancouver, BC",
        programs: ["Program 1"],
        contact: "Juliette Mollard Thibault",
        position: {
            lat: 49.285945657851165,
            lng: -123.12216791846
        }
    },
    {
        name: "Makers Making Change",
        tags: "Industry Partner",
        type: "industry",
        address: "3999 Henning Dr #400, Burnaby, BC",
        programs: ["Program 1"],
        contact: "",
        position: {
            lat: 49.2656145749895,
            lng: -123.01496378746197
        }
    },
    {
        name: "Microsoft",
        tags: "Industry Partner",
        type: "industry",
        address: "725 Granville St Suite 700 Vancouver, BC",
        programs: ["Program 1"],
        contact: "Emma Gray",
        position: {
            lat: 49.282238504262544,
            lng: -123.11960517823994
        }
    }
]
const postSecondary = [
    {
        name: "Capilano University",
        tags: "Post Secondary",
        type: "postsec",
        address: "2055 Purcell Way, North Vancouver, BC V7J 3H5",
        programs: ["Program 1"],
        position: {
            lat: 49.32095962114928,
            lng: -123.02201144509955
        }
    },
]

const sql = postgres({
    host                 : process.env.MAPS_DB_ENDPOINT,            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : process.env.MAPS_DB,            // Name of database to connect to
    username             : process.env.MAPS_DB_USER,            // Username of database user
    password             : process.env.MAPS_DB_PASS,            // Password of database user
    ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync('/Users/nirbhaykwatra/ssh-keys/ca-central-1-bundle.pem').toString(),
        
    }
})

async function insertData() {
    await sql `INSERT INTO map_institutions.schools (
                                      name, 
                                      tags, 
                                      type, 
                                      address, 
                                      district, 
                                      requests, 
                                      programs, 
                                      location
    ) VALUES (
              ${schools[0].name}, 
              ${schools[0].tags}, 
              ${schools[0].type}, 
              ${schools[0].address}, 
              ${schools[0].district}, 
              ${schools[0].requests}, 
              ${schools[0].programs}, 
              ${schools[0].position}
                            );`
    
    console.log(`Inserted ${schools[0].name}'s data into the database.`);

}

export { insertData, schools, industryPartners, postSecondary };