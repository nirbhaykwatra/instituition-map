import postgres from "postgres";
import fs from "fs";
import path from "path";

// const industryPartners = [
//     {
//         name: "Elk Valley Resources",
//         tags: "Industry Partner",
//         type: "industry",
//         address: "565 Michel Creek Rd, Sparwood, BC",
//         programs: ["Program 1"],
//         contact: "Jay Weldon",
//         position: {
//             lat: 49.743664238353965,
//             lng: -114.8768418788194
//         }
//     },
//     {
//         name: "BC Wildlife Federation",
//         tags: "Industry Partner",
//         type: "industry",
//         address: "9706 188 St, Surrey, BC",
//         programs: ["Program 1"],
//         contact: "Arielle Garsson",
//         position: {
//             lat: 49.178792439098864,
//             lng: -122.70057571001746
//         }
//     },
//     {
//         name: "Entuitive Consulting",
//         tags: "Industry Partner",
//         type: "industry",
//         address: "1075 W Georgia St Suite 1020, Vancouver, BC",
//         programs: ["Program 1"],
//         contact: "Juliette Mollard Thibault",
//         position: {
//             lat: 49.285945657851165,
//             lng: -123.12216791846
//         }
//     },
//     {
//         name: "Makers Making Change",
//         tags: "Industry Partner",
//         type: "industry",
//         address: "3999 Henning Dr #400, Burnaby, BC",
//         programs: ["Program 1"],
//         contact: "",
//         position: {
//             lat: 49.2656145749895,
//             lng: -123.01496378746197
//         }
//     },
//     {
//         name: "Microsoft",
//         tags: "Industry Partner",
//         type: "industry",
//         address: "725 Granville St Suite 700 Vancouver, BC",
//         programs: ["Program 1"],
//         contact: "Emma Gray",
//         position: {
//             lat: 49.282238504262544,
//             lng: -123.11960517823994
//         }
//     }
// ]
// const postSecondary = [
//     {
//         name: "Capilano University",
//         tags: "Post Secondary",
//         type: "postsec",
//         address: "2055 Purcell Way, North Vancouver, BC V7J 3H5",
//         programs: ["Program 1"],
//         position: {
//             lat: 49.32095962114928,
//             lng: -123.02201144509955
//         }
//     },
// ]

export const sql_db = postgres({
    host                 : process.env.MAPS_DB_ENDPOINT,            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : process.env.MAPS_DB,            // Name of database to connect to
    username             : process.env.MAPS_DB_USER,            // Username of database user
    password             : process.env.MAPS_DB_PASS,            // Password of database user
    ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(path.dirname(path.dirname(import.meta.dirname)), `ca-central-1-bundle.pem`)).toString(),
        
    }
});

export const sql_auth = postgres({
    host                 : process.env.MAPS_DB_ENDPOINT,            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : process.env.MAPS_AUTH_DB,            // Name of database to connect to
    username             : process.env.MAPS_DB_USER,            // Username of database user
    password             : process.env.MAPS_DB_PASS,            // Password of database user
    ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.join(path.dirname(path.dirname(import.meta.dirname)), `ca-central-1-bundle.pem`)).toString(),

    }
});

async function retrieveSchools() {
    return sql_db`SELECT * FROM map_institutions.schools;`;
}

async function retrieveIndustry() {
    return sql_db`SELECT * FROM map_institutions.partners;`;
}

async function retrievePostSecondary() {
    return sql_db`SELECT * FROM map_institutions.postsecondary;`;
}

function addSchool(name, tags, type, address, district, programs, location) {
    return sql_db`INSERT INTO map_institutions.schools (name, tags, type, address, district, programs, location) VALUES (${name}, ${tags}, ${type}, ${address}, ${district} ${programs}, ${location});`;
}

function addIndustry(name, tags, type, address, programs, contact, location) {
    return sql_db`INSERT INTO map_institutions.partners (name, tags, type, address, programs, contact, location) VALUES (${name}, ${tags}, ${type}, ${address}, ${programs}, ${contact}, ${location});`;
}

function addPostSecondary(name, tags, type, address, contact, programs, location) {
    return sql_db`INSERT INTO map_institutions.postsecondary (name, tags, type, address, contact, programs, location) VALUES (${name}, ${tags}, ${type}, ${address}, ${contact}, ${programs}, ${location});`;
}

export async function addInstitution(name, tags, type, address, district, programs, contact, position) {
    if (type === "industry") {
        return addIndustry(name, tags, type, address, programs, contact, position);
    }
    else if (type === "postsec") {
        return addPostSecondary(name, tags, type, address, contact, programs, position);
    }
    else if (type === "school") {
        return addSchool(name, tags, type, address, district, programs, position);
    }
    else {}
}

export async function checkSchool(name) {
    return sql_db`SELECT * FROM map_institutions.schools WHERE name = ${name};`;
}

export async function checkIndustry(name) {
    return sql_db`SELECT * FROM map_institutions.partners WHERE name = ${name};`;
}

export async function checkPostSecondary(name) {
    return sql_db`SELECT * FROM map_institutions.postsecondary WHERE name = ${name};`;
}

export const schools = await retrieveSchools();
export const industryPartners = await retrieveIndustry();
export const postSecondary = await retrievePostSecondary();