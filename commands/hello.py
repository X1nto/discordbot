import discord
from discord.ext import commands

class hello(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def hello(self, ctx):
        await ctx.send('Hi')

def setup(client):
    client.add_cog(hello(client))

