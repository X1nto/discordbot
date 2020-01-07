import discord
import os
import random
from discord.ext import commands

class random(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def random(self, ctx):
        for filename in os.listdir('./commands/images'):
            list = '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'
            await ctx.send('take this', file=discord.File(random.choice(list)))

def setup(client):
    client.add_cog(random(client))
