import discord
from discord.ext import commands

class helpmenu(commands.Cog):
    """დახმარების მენიუ"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def help(self, ctx, *cog):
        if not cog:
            embed = discord.Embed(description='Help Menu')
            cogdesc = ''
            for x in self.bot.cogs:
                cogdesc += f'**{x}** - {self.bot.cogs[x].__doc__}\n'
            embed.add_field(name='Cogs', value=cogdesc)
            await ctx.send(embed=embed)
            await ctx.send('აქ ჩამოთვლილ ბრძანებებს აქვთ თავიანთი დახმარების მენიუ, \n გამოიყენეთ `.help {ბრძანების სახელი}` მათ გამოსაჩენად')

def setup(client):
    client.add_cog(helpmenu(client))


