---
title: "Can we make world models multiplayer?"
draft: true 
date: 2025-08-08T09:16:45.000Z
description: "Some of my thoughts on recent developments of world models and speculations of where it might lead."
categories:
---

I am writing this post after the release of Google's [Genie 3](https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/). I recommend reading this [blog post](https://www.xunhuang.me/blogs/world_model.html) that gives a good overview of the current state of World Models. 

World models seem to be getting better and better, and maybe one day we will be able to have an infinite interactive simulation. This will likely be the case given the the path we are on. But, singleplayer gets boring. If we truly want the Metaverse, we need multiplayer.

{{< img
  src="https://i.redd.it/z7slqyhi7fhf1.png"
  alt="Zucc Meme"
  class="max-w-md mx-auto" >}}

> *[Source](https://www.reddit.com/r/singularity/comments/1mj8bnc/marks_next_target_genies_dev_team/)*

Most world models work through a frame-by-frame prediction. When one video frame comes in, the model uses that frame to predict the next frame. Video models like Veo or Sora, which are a type of world model, are trained on past and future frames in a video. This allows them to generate videos that are temporally accurate; however, they are only able to maintain quality for about 8 seconds before going completely downhill. The recent [MirageLSD](https://about.decart.ai/publications/mirage) model from Decart is particularly interesting because they were able to achieve real-time diffusion. Theoretically, they can generate frames for an infinite duration (given enough compute). The model primarily works by taking some sort of real-time input like a video, game, or IRL stream - and generating an output. The Genie series on the other hand, works like the more traditional video model. But instead of text/image to video, you get text/image to world. Genie 3's model architecture hasn't been open sourced yet, but it's likely very similar to Genie 2 with some more architectural improvements and obviously more data + compute. 

If we zoom 5-10 years into the future, the issue won't be of whether we can get a stable coherent world, but rather how these worlds can be interactive and multiplayer. The most widely used world model as of today is self-driving cars. They understand the world in similar ways, by predicting the next few seconds of the world and probabilistically sampling on what to do next. Self-Driving cars are also singleplayer. If a Waymo sees a Waymo, it treats it like a normal car. There's no sort of vehicle to vehicle communciation. To be honest, there's probably very little need of ever having inter-vehicle communcation. But wouldn't that be cool? 

On the other hand, what about games? Genie 3 lets us generate a singleplayer game from scratch. If we added another player into the world, how would that affect things? The world model woudn't directly know that that is another player. I mean, maybe it would. If we ever got to situation where we could reliably get another player into the same world, we would have sovled a much harder problem.

In normal multiplayer games, there's usually some concept of a client and server. In large multiplayer games like MMOs, they follow [server authoritative](https://medium.com/mighty-bear-games/what-are-server-authoritative-realtime-games-e2463db534d1) rules. This means that the client usually inputs some action (i.e. move forward), and the server verifies it (by verifying that the user's position at the new time is further than the previous one). The server is able to do the game logic because it has direct acccess to the player's character. With world models, things are tricky. Each object or character in a scene cannot be directly manipulated. We cannot transfer the same character in a video to another video. There is no server. There is no "logic". It's just weights and biases. There's some work being done on [interpretability](https://www.transformer-circuits.pub/2022/mech-interp-essay) primarily for language modeling, but right now these models are just black boxes capable of black magic. Let's say we figure out how to directly manipulate or control the objects in a scene, what would a multiplayer solution look like?

{{< img
  src="/img/server-architecture-image.png"
  alt="Server Architecture"
  class="max-w-md mx-auto" >}}
> *Google Imagen with the prompt of the pararaph below*

Instead of a server that understands logic, we could create a server that understands perception. The first step starts with client-side perception, using something like a [VLM](https://www.nvidia.com/en-us/glossary/vision-language-models/) to analayze a player's screen. For Alice's screen, the result might be "Alice is currently looking in the north direction with a car in the viewport, is currently at position (26, 24, 0), and Bob is facing in the South direction, (insert more stuff to send to the server here)". The server's job isn't to do any physics calculations, but to reconcile the narratives of every client. It merges these descriptions into a single, coherent world state. If Alice's client generates a tree where Bob's doesn't, the server can act as the arbiter, deciding the canonical state of the world. The reconciled, unified state is then fed back to each player's world model as a conditioning input for generating the next frame. This ensures that while the micro-details might be generated locally, the macro-state of the world remains consistent for everyone.

This approach bypasses the need to interpret the model's internal weights and instead uses another powerful AI (the VLM) to create a shared understanding of the generated world.

The better and better these world models seem to be getting, the more plausible the reality of the [simulation hypothesis](https://simulation-argument.com/simulation.pdf). We still have a long way to go before we have a stable, single-player generative world, let alone a multiplayer one. But it's clear that if these technologies reach their full potential, the endgame isn't just about creating worlds—it's about sharing them.