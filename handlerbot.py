#!/usr/bin/python3.6

import discord
from dotenv import load_dotenv
import random
from discord.ext import commands
import os

load_dotenv()
TOKEN = os.getenv('TOKEN')

bot = commands.Bot(command_prefix = '.')

#this script types "Connected!" in terminal if nothing has gone wrong    
@bot.event
async def on_ready():
   print('Connected!')        

for filename in os.listdir('./commands'):
   if filename.endswith('.py'):
      bot.load_extension(f'commands.{filename[:-3]}')

bot.run(TOKEN)
