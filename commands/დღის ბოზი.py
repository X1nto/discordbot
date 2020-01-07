import discord
import random
from discord.ext import commands

class dgisbozi(commands.Cog):

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def dgisbozi(self, ctx):
        user = random.choice(ctx.guild.members)
        await ctx.send('დღის ბოზი არის %s' % user.mention)

def setup(client):
    client.add_cog(dgisbozi(client))


