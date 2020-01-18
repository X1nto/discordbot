import discord
from discord.ext import commands

class admin(commands.Cog, name='Admin'):
    """ადმინ პანელი"""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def load(self, ctx, *, module):
        """მოდულის ჩართვა"""
        try:
            self.bot.load_extension(module)
        except commands.ExtensionError as e:
            await ctx.send(f'{e.__class__.__name__}: {e}')
        else:
            await ctx.send('\N{OK HAND SIGN}')

    @commands.command()
    async def unload(self, ctx, *, module):
        """მოდულის გათიშვა"""
        try:
            self.bot.unload_extension(module)
        except commands.ExtensionError as e:
            await ctx.send(f'{e.__class__.__name__}: {e}')
        else:
            await ctx.send('\N{OK HAND SIGN}')

    @commands.group(name='reload', invoke_without_command=True)
    async def _reload(self, ctx, *, module):
        """მოდულის გადატვირთვა"""
        try:
            self.bot.reload_extension(module)
        except commands.ExtensionError as e:
            await ctx.send(f'{e.__class__.__name__}: {e}')
        else:
            await ctx.send('\N{OK HAND SIGN}')

    @commands.command()
    async def clear(self, ctx, number:int=None):
        """ჩატის გაწმენდა"""
        if ctx.message.author.guild_permissions.manage_messages:
            try:
                if number is None:
                    await ctx.send('დააკონკრეტეთ რაოდენობა')
                else:
                    await ctx.channel.purge(limit=number)
            except:
                await ctx.send('უპს. მოხდა რაღაც შეცდომა')
        else:
            await ctx.send(f'ctx.message.author.mention - შენ არ გაქვს ამის გამოყენების უფლება!')

def setup(client):
    client.add_cog(admin(client))
