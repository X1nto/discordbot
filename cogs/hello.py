import discord
from discord.ext import commands

class hello(commands.Cog):
    """გამარჯობა"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def hello(self, ctx):
        """ზდ"""
        await ctx.send('Hi')

def setup(client):
    client.add_cog(hello(client))

