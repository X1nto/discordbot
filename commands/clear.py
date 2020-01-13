import discord
from discord.ext import commands

class clear(commands.Cog):
    """ჩატის გაწმენდა"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def clear(self, ctx, amount=50):
        await ctx.channel.purge(limit=amount)

def setup(client):
    client.add_cog(clear(client))
