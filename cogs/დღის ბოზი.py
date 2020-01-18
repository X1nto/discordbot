import discord
import random
from discord.ext import commands

class dgisbozi(commands.Cog):
    """ირჩევს რანდომ დღის ბოზს"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def dgisbozi(self, ctx):
        """იმედია ამას ახსნა არ სჭირდება"""
        user = random.choice(ctx.guild.members)
        await ctx.send('დღის ბოზი არის %s' % user.mention)

def setup(client):
    client.add_cog(dgisbozi(client))


