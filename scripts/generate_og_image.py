import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    W, H = 1200, 630

    font_dir = "/Users/shrid/Repos/projects/shridmishra/scripts/fonts"
    out_png = "/Users/shrid/Repos/projects/shridmishra/public/assets/preview.png"
    out_webp = "/Users/shrid/Repos/projects/shridmishra/public/assets/preview.webp"
    out_og = "/Users/shrid/Repos/projects/shridmishra/public/og.png"

    # Satoshi TTF Fonts
    fn_hero = ImageFont.truetype(os.path.join(font_dir, "Satoshi-Bold.ttf"), 76)
    fn_role = ImageFont.truetype(os.path.join(font_dir, "Satoshi-Bold.ttf"), 20)
    fn_pill = ImageFont.truetype(os.path.join(font_dir, "Satoshi-Medium.ttf"), 14)
    fn_code = ImageFont.truetype(os.path.join(font_dir, "Satoshi-Medium.ttf"), 16)
    fn_code_bold = ImageFont.truetype(os.path.join(font_dir, "Satoshi-Bold.ttf"), 16)
    fn_url = ImageFont.truetype(os.path.join(font_dir, "Satoshi-Bold.ttf"), 20)

    # 1. Base Pitch Black Background
    bg = Image.new("RGBA", (W, H), (8, 9, 12, 255))

    # 2. Ambient Radial Glows
    # Top-Left Ambient Light (White/Cyan glow)
    g1 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(g1)
    for r in range(480, 0, -5):
        a = int(38 * (1 - (r / 480) ** 1.8))
        d1.ellipse([250 - r, 150 - r, 250 + r, 150 + r], fill=(255, 255, 255, a))
    g1 = g1.filter(ImageFilter.GaussianBlur(80))
    bg = Image.alpha_composite(bg, g1)

    # Bottom-Right Glow (Indigo/Violet subtle glow)
    g2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(g2)
    for r in range(520, 0, -5):
        a = int(45 * (1 - (r / 520) ** 1.8))
        d2.ellipse([920 - r, 450 - r, 920 + r, 450 + r], fill=(99, 102, 241, a))
    g2 = g2.filter(ImageFilter.GaussianBlur(90))
    bg = Image.alpha_composite(bg, g2)

    # 3. Fine Grid Background
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grid)
    grid_size = 50
    for x in range(0, W, grid_size):
        gdraw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, H, grid_size):
        gdraw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)
    bg = Image.alpha_composite(bg, grid)

    # 4. Subtle Grain Texture
    noise = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    npx = noise.load()
    random.seed(42)
    for y in range(0, H, 2):
        for x in range(0, W, 2):
            v = random.randint(0, 255)
            npx[x, y] = (v, v, v, 6)
    bg = Image.alpha_composite(bg, noise)

    # 5. RIGHT SIDE: Floating Code/Editor Card (Balances the entire right 50%)
    card_w, card_h = 440, 360
    card_x = W - card_w - 70
    card_y = (H - card_h) // 2

    # Card Shadow
    c_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cs_draw = ImageDraw.Draw(c_shadow)
    cs_draw.rounded_rectangle(
        [card_x + 10, card_y + 15, card_x + card_w + 10, card_y + card_h + 15],
        radius=20,
        fill=(0, 0, 0, 160)
    )
    c_shadow = c_shadow.filter(ImageFilter.GaussianBlur(25))
    bg = Image.alpha_composite(bg, c_shadow)

    # Card Fill & Border
    card_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(card_layer)

    # Translucent Dark Glass Fill
    cdraw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=20,
        fill=(16, 18, 24, 235),
        outline=(255, 255, 255, 35),
        width=1
    )

    # Top Header Bar of Editor Card
    header_h = 42
    cdraw.line(
        [(card_x, card_y + header_h), (card_x + card_w, card_y + header_h)],
        fill=(255, 255, 255, 20),
        width=1
    )

    # macOS Window Dots (Red, Yellow, Green)
    dots = [(239, 68, 68), (245, 158, 11), (34, 197, 94)]
    dot_x = card_x + 20
    dot_y = card_y + 16
    for color in dots:
        cdraw.ellipse([dot_x, dot_y, dot_x + 10, dot_y + 10], fill=color + (255,))
        dot_x += 18

    # Title in Editor Header
    cdraw.text((card_x + 180, card_y + 13), "shrid.config.ts", font=fn_code, fill=(148, 163, 184, 255))

    # Code Lines Content
    code_start_x = card_x + 25
    code_start_y = card_y + header_h + 30
    line_h = 32

    code_lines = [
        [("export ", (244, 114, 182)), ("const ", (96, 165, 250)), ("shrid", (255, 255, 255)), (" = {", (255, 255, 255))],
        [("  role: ", (148, 163, 184)), ('"Design Engineer"', (167, 243, 208))],
        [("  stack: ", (148, 163, 184)), ("[", (255, 255, 255)), ('"Next.js"', (167, 243, 208)), (", ", (255, 255, 255)), ('"React"', (167, 243, 208)), ("]", (255, 255, 255))],
        [("  focus: ", (148, 163, 184)), ('"UI/UX & Systems"', (167, 243, 208))],
        [("  status: ", (148, 163, 184)), ('"Available for work"', (253, 224, 71))],
        [("};", (255, 255, 255))]
    ]

    for line_idx, line in enumerate(code_lines):
        cur_x = code_start_x
        cy_pos = code_start_y + (line_idx * line_h)
        for text_part, col in line:
            cdraw.text((cur_x, cy_pos), text_part, font=fn_code, fill=col + (255,))
            t_box = fn_code.getbbox(text_part)
            cur_x += (t_box[2] - t_box[0])

    bg = Image.alpha_composite(bg, card_layer)

    # 6. LEFT SIDE: Title, Subtitle, Tech Pills, and Footer URL
    draw = ImageDraw.Draw(bg)

    pad_l = 75
    name_y = 130
    
    # 1. Main Title: Shrid Mishra
    draw.text((pad_l, name_y), "Shrid Mishra", font=fn_hero, fill=(255, 255, 255, 255))

    # 2. Increased Space before Role Subtitle
    role_y = name_y + 115  # Generous comfortable gap
    draw.text((pad_l, role_y), "DESIGN ENGINEER  ·  FULL-STACK DEVELOPER", font=fn_role, fill=(161, 161, 170, 255))

    # 3. Tech Pills Layer
    pill_y = role_y + 55
    pills = ["Next.js", "TypeScript", "React", "Tailwind", "Node.js"]
    
    pill_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(pill_layer)
    cx = pad_l
    for p in pills:
        bbox = fn_pill.getbbox(p)
        pw = bbox[2] - bbox[0] + 30
        ph = 36
        pdraw.rounded_rectangle(
            [cx, pill_y, cx + pw, pill_y + ph],
            radius=18,
            fill=(255, 255, 255, 14),
            outline=(255, 255, 255, 40),
            width=1
        )
        pdraw.text((cx + 15, pill_y + 8), p, font=fn_pill, fill=(240, 240, 245, 255))
        cx += pw + 10

    bg = Image.alpha_composite(bg, pill_layer)
    draw = ImageDraw.Draw(bg)

    # 4. Footer URL Anchor: Diagonal Arrow Box + shrid.site
    url_y = H - 95
    box_s = 38
    draw.rounded_rectangle(
        [pad_l, url_y, pad_l + box_s, url_y + box_s],
        radius=11,
        fill=(255, 255, 255, 255)
    )
    # Dark arrow icon inside white box
    ax1, ay1 = pad_l + 12, url_y + 26
    ax2, ay2 = pad_l + 26, url_y + 12
    draw.line([(ax1, ay1), (ax2, ay2)], fill=(10, 10, 12, 255), width=3)
    draw.line([(ax2 - 8, ay2), (ax2, ay2)], fill=(10, 10, 12, 255), width=3)
    draw.line([(ax2, ay2), (ax2, ay2 + 8)], fill=(10, 10, 12, 255), width=3)

    # Domain URL Text: shrid.site
    draw.text((pad_l + 52, url_y + 6), "shrid.site", font=fn_url, fill=(255, 255, 255, 255))

    # Save
    rgb = bg.convert("RGB")
    rgb.save(out_png, "PNG", quality=100)
    rgb.save(out_og, "PNG", quality=100)
    rgb.save(out_webp, "WEBP", quality=95)
    print(f"Generated Balanced Python OG Image successfully at: {out_png}")

if __name__ == "__main__":
    create_og_image()
