#!/usr/bin/python3.8

import discord
from dotenv import load_dotenv
import random
from discord.ext import commands
import os

load_dotenv()
TOKEN = os.getenv('TOKEN')

bot = commands.Bot(command_prefix = '.')
bot.remove_command('help')

#this script types "Connected!" in terminal if nothing has gone wrong    
@bot.event
async def on_ready():
   print('Connected!')        

for filename in os.listdir('./cogs'):
   if filename.endswith('.py'):
      bot.load_extension(f'cogs.{filename[:-3]}')

bot.run(TOKEN)
