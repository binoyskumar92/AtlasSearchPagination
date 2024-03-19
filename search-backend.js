require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI; // MongoDB connection string in .env file
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public')); // Serve static files from 'public' folder
app.get('/data', async (req, res) => {
    const { searchAfter, searchBefore } = req.query;

    try {
        await client.connect();

        const collection = client.db("sample_mflix").collection("comments");

        // General search stage without specific filtering
        let searchStage = {
            $search: {
                index: "sidx_on_name", // Replace with your actual index name
                compound: {
                    must: [
                        {
                            wildcard: {
                                path: "name", // Field that you are searching, can be a field that exists in all documents
                                query: "*", // An empty query string matches all documents
                            }
                        }
                    ]
                },
                ...(searchAfter && {searchAfter: searchAfter}),
                ...(searchBefore && {searchAfter: searchBefore}),
                count:{
                    type: 'total'
                }
            }
        };

        const aggregation = [
            searchStage,
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    email: 1,
                    text: 1,
                    meta: "$$SEARCH_META",
                    // Include other fields you want to project ^^
                    paginationToken: { $meta: "searchSequenceToken" },
                }
            },
        ];

        const results = await collection.aggregate(aggregation).toArray();
        console.log(JSON.stringify(aggregation))
        res.json(results);
    } catch (error) {
        res.status(500).send(error.toString());
        console.log(error)
    } finally {
        await client.close();
    }
});
app.listen(port, () => console.log(`Server running on port ${port}`));
