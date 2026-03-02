#!/usr/bin/env python3
"""
生成 TokenStar 统一四角星图标
样式：蓝紫渐变背景（圆角方形） + 白色四角星 + 中心蓝色圆点
无黑色外边框，与 PWA 移动端图标风格一致
"""

import math
import os
from PIL import Image, ImageDraw

def draw_icon(size: int, corner_radius_ratio: float = 0.22) -> Image.Image:
    """生成单个尺寸的图标"""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    r = int(size * corner_radius_ratio)

    # ── 渐变背景（蓝紫）──────────────────────────────────────────────
    # 从左上 #4F6EF7（蓝）到右下 #7C3AED（紫）
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)

    # 逐行绘制渐变
    for y in range(size):
        t = y / (size - 1)
        r_c = int(79 + (124 - 79) * t)
        g_c = int(110 + (58 - 110) * t)
        b_c = int(247 + (237 - 247) * t)
        bg_draw.line([(0, y), (size, y)], fill=(r_c, g_c, b_c, 255))

    # 圆角遮罩
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=255)

    img.paste(bg, (0, 0), mask)

    # ── 四角星路径 ────────────────────────────────────────────────────
    cx, cy = size / 2, size / 2
    outer = size * 0.40   # 外尖半径
    inner = size * 0.13   # 内凹半径

    points = []
    for i in range(8):
        angle = math.radians(i * 45 - 90)
        rad = outer if i % 2 == 0 else inner
        px = cx + rad * math.cos(angle)
        py = cy + rad * math.sin(angle)
        points.append((px, py))

    # 绘制白色四角星（带轻微透明以匹配原图）
    draw.polygon(points, fill=(255, 255, 255, 242))

    # ── 中心蓝色圆点 ──────────────────────────────────────────────────
    dot_r = size * 0.095
    # 渐变圆点：用多个同心圆模拟（浅蓝 → 蓝紫）
    for i in range(int(dot_r), 0, -1):
        t = i / dot_r
        rc = int(147 + (99 - 147) * (1 - t))
        gc = int(197 + (102 - 197) * (1 - t))
        bc = int(253 + (241 - 253) * (1 - t))
        ac = 255
        draw.ellipse(
            [cx - i, cy - i, cx + i, cy + i],
            fill=(rc, gc, bc, ac)
        )

    return img


def save_all():
    base = "/home/ubuntu/tokenstar/frontend/public"
    icons_dir = os.path.join(base, "icons")
    os.makedirs(icons_dir, exist_ok=True)

    sizes_info = [
        # (尺寸, 输出路径, 圆角比例)
        (16,  os.path.join(base, "favicon-16x16.png"),         0.20),
        (32,  os.path.join(base, "favicon-32x32.png"),         0.20),
        (48,  os.path.join(base, "favicon-48x48.png"),         0.20),
        (180, os.path.join(base, "favicon-180x180.png"),       0.22),
        (180, os.path.join(base, "apple-touch-icon.png"),      0.22),
        (180, os.path.join(icons_dir, "icon-180.png"),         0.22),
        (192, os.path.join(base, "favicon-192x192.png"),       0.22),
        (192, os.path.join(icons_dir, "icon-192.png"),         0.22),
        (192, os.path.join(icons_dir, "icon-192-maskable.png"),0.22),
        (512, os.path.join(base, "favicon-512x512.png"),       0.22),
        (512, os.path.join(icons_dir, "icon-512.png"),         0.22),
        (512, os.path.join(icons_dir, "icon-512-maskable.png"),0.22),
    ]

    for size, path, cr in sizes_info:
        img = draw_icon(size, cr)
        img.save(path, "PNG", optimize=True)
        print(f"✓ {path} ({size}x{size})")

    # favicon.ico：包含 16/32/48 三个尺寸
    ico_imgs = [draw_icon(s, 0.20) for s in [16, 32, 48]]
    ico_path = os.path.join(base, "favicon.ico")
    ico_imgs[0].save(ico_path, format="ICO", sizes=[(16,16),(32,32),(48,48)],
                     append_images=ico_imgs[1:])
    print(f"✓ {ico_path} (16/32/48)")

    print("\n所有图标生成完成！")


if __name__ == "__main__":
    save_all()
