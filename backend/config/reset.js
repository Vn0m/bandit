import { pool } from './database.js'
import './dotenv.js'
import bandsData from '../data/bands.js'

const createBandsTables = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS bands;

    CREATE TABLE bands (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        origin VARCHAR(255) NOT NULL,
        formed INTEGER NOT NULL,
        genre VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT NOT NULL,
        key_albums TEXT[] NOT NULL,
        members TEXT[] NOT NULL,
        member_count INTEGER NOT NULL,
        active_years INTEGER NOT NULL,
        hit_songs TEXT[] NOT NULL,
        awards TEXT[] NOT NULL,
        website VARCHAR(255) NOT NULL
    );
    `
    try {
        const res = await pool.query(createTableQuery)
        console.log('bands table created successfully')        
    } catch (error) {
        console.error('Error creating bands table', error)
    }
}

const seedBandsTable = async () => {
    await createBandsTables()
    bandsData.forEach((band) => {
        const insertQuery = `
        INSERT INTO bands (
            id, name, origin, formed, genre, image, description, 
            long_description, key_albums, members, member_count, 
            active_years, hit_songs, awards, website
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `
        const values = [
            band.id,
            band.name,
            band.origin,
            band.formed,
            band.genre,
            band.image,
            band.description,
            band.longDescription,
            band.keyAlbums,
            band.members,
            band.memberCount,
            band.activeYears,
            band.hitSongs,
            band.awards,
            band.website,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if(err){
                console.error("Error inserting band", err)
                return
            }
            console.log(`${band.name} added successfully`)
        })
    })
}

seedBandsTable()