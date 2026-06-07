#!/usr/bin/env npx tsx
import { v2 as cloudinary } from 'cloudinary';


// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dilhlxtsm',
  api_key: '137816234647128',
  api_secret: 'lsIdW7bg2u3QU_sL31ANfWJmyYU'
});

async function run() {
  try {
    console.log("1. Uploading sample image to Cloudinary...");
    const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg");
    
    console.log("Upload Success!");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);

    console.log("\n2. Fetching image details from Cloudinary API...");
    const details = await cloudinary.api.resource(uploadResult.public_id);
    console.log(`Width: ${details.width}px`);
    console.log(`Height: ${details.height}px`);
    console.log(`Format: ${details.format}`);
    console.log(`File size (bytes): ${details.bytes}`);

    console.log("\n3. Generating transformed image URL...");
    // Transform the image:
    // fetch_format: 'auto' (f_auto) - Automatically chooses the most optimal format (WebP/AVIF) for the requesting browser.
    // quality: 'auto' (q_auto) - Automatically compresses the image to the lowest file size while keeping visual quality high.
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      secure: true,
      fetch_format: 'auto',
      quality: 'auto'
    });

    console.log("\nDone! Click link below to see optimized version of the image. Check the size and the format.");
    console.log(transformedUrl);
  } catch (error) {
    console.error("An error occurred during the Cloudinary operations:", error);
  }
}

run();
