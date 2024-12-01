use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

pub const SEED_PROGRAM_CONFIG: &[u8] = b"flip_config";
pub const SEED_GAME_IDS: &[u8] = b"flip_gameid";

#[program]
mod solanacoinflip {
    use super::*;

    pub fn coin_flip(ctx: Context<InitializeSolanacoinflip>, _game_ids: u128) -> Result<()> {
        let flip_ctx = &mut ctx.accounts.flip_result;

        ctx.accounts.game_ids.id += 1;
        flip_ctx.result = 1;
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(game_ids:u128)]
pub struct InitializeSolanacoinflip<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        seeds = [b"count"],
        bump,
    )]
    pub game_ids: Account<'info, GameIds>,

    #[account(
        init,
        payer=owner,
        space = 8+ Flip::INIT_SPACE,
        seeds = [SEED_PROGRAM_CONFIG,owner.key().as_ref(), &game_ids.id.to_le_bytes()],
        bump
    )]
    pub flip_result: Account<'info, Flip>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Flip {
    result: u8,
}

#[account]
#[derive(InitSpace)]
pub struct GameIds {
    id: u128,
}
