//import express from "express";
//import fetch from "node-fetch";
//import cors from "cors";
//
//const app = express();
//app.use(express.json());
//app.use(cors());
//
//// 🔑 Don't expose this to the client!
//const PAT = "33039638cbe04bb4b3e0038564b0fac6"; 
//const USER_ID = "dylanjdev";
//const APP_ID = "Face";
// const MODEL_ID = "face-detection";
// const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";
// 
// 
// app.post("/clarifai", async (req, res) => {
//   const { imageUrl } = req.body;
// 
//   const raw = JSON.stringify({
//     user_app_id: { user_id: USER_ID, app_id: APP_ID },
//     inputs: [{ data: { image: { url: imageUrl } } }]
//   });
// 
//   try {
//     const response = await fetch(
//   `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
//   {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Key " + PAT,
//     },
//     body: raw,
//   }
// );
// 
// 
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Clarifai proxy error:", error);
//    res.status(500).json({ error: "Failed to call Clarifai API" });
//  }
//});
//
//const PORT = 5000;
//app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
