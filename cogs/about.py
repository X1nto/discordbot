import discord
from discord.ext import commands

class about(commands.Cog):
    """ამ ბოტის შესახებ"""
  
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def about(self, *, ctx):
        """ბოტის შესახებ"""
        creator = '<@423915768191647755>'
        await ctx.send('This bot was created by %s ' % creator)

def setup(client):
    client.add_cog(about(client))
