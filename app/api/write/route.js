import { storage } from "@/lib/firebase/connection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

const options = (about) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Authorization': process.env.FIREWORKS_API_KEY,
        },
        body: JSON.stringify({
            model: "accounts/fireworks/models/mixtral-8x7b-instruct",
            stream: true,
            n: 1,
            messages: [
                { role: "system", content: "you are a story maker" },
                {
                    role: "user",
                    content: about
                }
            ],
            stop: [
                "<|im_start|>",
                "<|im_end|>",
                "<|endoftext|>"
            ],
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            context_length_exceeded_behavior: "truncate",
            temperature: 0.9,
            max_tokens: 4096
        }),
    }
}

const endpoint = "https://api.fireworks.ai/inference/v1/chat/completions"


const apiKey = "Bearer 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"

export const  POST = async (req) => {

    const body = await req.json()

    const story = {
        about: body.about,
        count: body.count,
        genre: body.selectedGenres.length > 0 && `with this genres ${body.selectedGenres.join(" , ")}`,
        subject: `{subject} in the style of whimsical children's book illustrator, transparency and opacity, gabriele münter, editorial cartooning, digitally enhanced`
    }

    const createImage = async (text) => {

        console.log(text)
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: { Authorization: apiKey },
                method: "POST",
                body: JSON.stringify({ "inputs": `${text}` }),
            }, { cache: 'no-store' })

        const resultBuffer = await response.arrayBuffer();

        const imageRef = ref(storage, `/images/${Date.now()}.jpg`)
        await uploadBytes(imageRef, resultBuffer)


        const url = await getDownloadURL(imageRef)

        console.log(url)

        return url
    }

    const reqData = await fetch(endpoint, options(`Compose a story centered about ${story.about} , encompassing ${story.count} scenes ${story.genre} that align with the provided TypeScript interface "StoryRequest." Maintain a strict adherence to the JSON data format in your response. 
    interface StoryRequest {
      // Overall topic of the story
      topic: string;
    
      // Details about the main story
      story: {
        // Title of the story
        title: string;
    
        // Description of the story
        description: string;

        // long prompt for image generation related to the story with many details
        prompt: string;
    
        // List of scenes in the story
      scenes: {
          // Title of the scene
          script: string;
    
          // Content or script for the scene
          content: string;
    
          // long prompt for image generation related to the scene with many details
          prompt: string;
        }[];
      };
    }`))
    const data = await reqData.text()

    const res = data.split("data: ").map((val) => {
        try {
            return JSON.parse(val)
        } catch (e) {
            return
        }
    }).filter((val) => {
        return val
    }).map((val) => {
        try {
            return val.choices[0].delta.content
        } catch (e) {
            return
        }
    }).join("")

    let result = res.includes("```") ? res.split('```')[1].replace(/^[^\s]+/, '') : res

    let x
    if (result) {

        x = JSON.parse(result)
        for (let i = 0; i < x.story.scenes.length; i++) {

            x.story.scenes[i].prompt = await createImage(story.subject.replace('{subject}', x.story.scenes[i].prompt))
        }
    }


    return NextResponse.json(x ? x : JSON.parse(result))
}