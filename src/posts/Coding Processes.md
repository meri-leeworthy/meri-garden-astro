# Raspberry Pi Coding
DigitalOcean Ubuntu Server: `139.59.104.200`

## Blink Tips
`config` for settings
`help` for Blink commands
`CMD+T` or tap with two finger to open new tab/session
`exit` to close tab/session

## How to add a WiFi network to Raspberry Pi
`mosh ubpi`
`sudo nvim /etc/netplan/50-cloud-init.yaml`
Add network name and password under the other ones
`:wq` to save and exit
*Note: Colemak bindings don't work in `sudo nvim` for some reason*
`sudo reboot` to reboot and connect to WiFi

## tmux Tips
For all commands, `CTL+B` then... 
- `C` --> New Window
- `&` --> Kill Window
- `0` --> Open First Window, `1` --> Open Second Window, etc. 
*Windows are listed in the green bar down the bottom*
- `A` --> Attach to session, `D` --> Detach from session
- `"` --> Horizontal Split
- `%` --> Vertical Split
- `O` --> Go to other pane (or use arrow keys to change pane)
- `{/}` --> move pane left/right
- `[` Copy mode - use to scroll up in buffer, select text etc. Use arrow keys
- `q` quit copy mode

[Cheatsheet](https://opensource.com/article/20/7/tmux-cheat-sheet)  

## Neovim Tips
###  Colemak Bindings
- `S` to save
- `Q` to quit
- `k` Insert Mode
- `n/u/e/i` nav (l/u/d/r)

[Cheatsheet](https://github.com/theniceboy/nvim#keyboard-shortcuts)
