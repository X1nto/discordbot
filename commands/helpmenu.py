import discord
from discord.ext import commands

class helpmenu(commands.Cog):
    """დახმარების მენიუ"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def help(self, ctx, *cog):
        if not cog:
            embed = discord.Embed(title='Help Menu', description='აქ ჩამოთვლილ ბრძანებებს აქვთ თავიანთი დახმარების მენიუ, \n გამოიყენეთ `.help {ბრძანების სახელი}` მათ გამოსაჩენად')
            cogdesc = ''
            for x in self.bot.cogs:
                cogdesc += f'**{x}** - {self.bot.cogs[x].__doc__}\n'
            embed.add_field(name='Cogs', value=cogdesc)
            await ctx.send(embed=embed)
        else:
            found = False
            for x in self.bot.cogs:
                for y in cog:
                    if x == y:
                        embed = discord.Embed()
                        scog_info = ''
                        for c in self.bot.get_cog(y).get_commands():
                            if not c.hidden:
                                scog_info += f'**{c.name}** - {c.help}\n'
                        embed.add_field(name=f'{cog[0]} Module - {self.bot.cogs[cog[0]].__doc__}', value=scog_info)
                        found = True
            if not found:
                for x in self.bot.cogs:
                    for c in self.bot.get_cog(x).get_commands():

                        if c.name == cog[0]:
                            embed = discord.Embed()
                            embed.add_field(name=f'{c.name} - {c.help}', value=f'Proper Syntax:\n`{c.qualified_name} {c.signature}`')

                    found = True
                if not found:
                    embed = discord.Embed(title='შეცდომა!', description='არასწორი ბრძანება!')
                await ctx.send(embed=embed)

def setup(client):
    client.add_cog(helpmenu(client))


