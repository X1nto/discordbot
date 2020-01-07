import discord
from discord.ext import commands

class hola(commands.Cog):

    def __init__(self, client):
        self.client = client

    @commands.command()
    async def hola(self, ctx):
        await ctx.send('hola amigos!')

def setup(client):
    client.add_cog(hola(client))
