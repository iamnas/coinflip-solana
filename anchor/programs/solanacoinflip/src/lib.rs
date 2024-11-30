#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod solanacoinflip {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanacoinflip>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanacoinflip.count = ctx.accounts.solanacoinflip.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanacoinflip.count = ctx.accounts.solanacoinflip.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanacoinflip>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanacoinflip.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanacoinflip<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanacoinflip::INIT_SPACE,
  payer = payer
  )]
  pub solanacoinflip: Account<'info, Solanacoinflip>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanacoinflip<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanacoinflip: Account<'info, Solanacoinflip>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanacoinflip: Account<'info, Solanacoinflip>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanacoinflip {
  count: u8,
}
