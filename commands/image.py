import discord
from discord.ext import commands
import os

class image(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.command()
    async def image(self, ctx):
        await ctx.send('Here ya go', file=discord.File('owl.jpg'))

def setup(client):
    client.add_cog(image(client))

