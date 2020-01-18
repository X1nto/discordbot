import discord
from discord.ext import commands
import os

class bozi(commands.Cog):
    """გვაჩვენებს იმის სურათს"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def bozi(self, ctx):
       "ოთარაშვილის სურათი"
       os.chdir('/home/xinto/discordbot/commands/images')
       await ctx.send('', file=discord.File('bozi.jpg'))

def setup(client):
    client.add_cog(bozi(client))

