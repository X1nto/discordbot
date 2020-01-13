import discord
from discord.ext import commands

class ping(commands.Cog):
    """პინგის შემოწმება"""
    
    def __init__(self, bot): 
        self.bot = bot
 
    @commands.command()
    async def ping(self, ctx):
        await ctx.send(f'Pong! {round(self.bot.latency * 1000)}') 

def setup(client):
    client.add_cog(ping(client))



