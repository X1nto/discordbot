import discord
from discord.ext import commands

class test(commands.Cog):
    """იდკ"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def test(self, ctx):
        """აზრზე არ ვარ ეს რისთვის გავაკეთე"""
        await ctx.send('nibba')

def setup(client):
    client.add_cog(test(client))
  


