#!/usr/bin/python3.6

import os

import discord
from dotenv import load_dotenv
import random

load_dotenv()
TOKEN = os.getenv('TOKEN')

client = discord.Client()

@client.event
async def on_ready():
    print('Connected!')        

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!hello'):
       await message.channel.send('Hi')
    
    if message.content.startswith('!image'):
       await message.channel.send('Here ya go', file=discord.File('owl.jpg'))
    
    if message.content.startswith('!random'):
       #this is my image list that's located in this folder, you can use your own image names
       list = '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'
       await message.channel.send('take this', file=discord.File(random.choice(list)))

    if message.content.startswith('!bozi'):
       await message.channel.send('', file=discord.File('bozi.jpg'))

    if message.content.startswith('!დღის ბოზი'):
       user = random.choice(message.channel.guild.members)
       await message.channel.send("დღის ბოზი არის %s " % user.mention)

    if message.content.startswith('!about'):
       #replace <@423915768191647755> with your ID
       creator = '<@423915768191647755>'
       await message.channel.send('This bot was created by %s ' % creator) 

client.run(TOKEN)
