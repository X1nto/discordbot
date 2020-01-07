import discord
from discord.ext import commands

class about(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def about(self, ctx):
        creator = '<@423915768191647755>'
        await ctx.send('This bot was created by %s ' % creator)

def setup(client):
    client.add_cog(about(client))
