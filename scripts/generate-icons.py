#!/usr/bin/env python3
"""Genera iconos PWA placeholder para BarberSchool."""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import struct
    import zlib

    def write_png(path: str, size: int, r: int, g: int, b: int) -> None:
        def chunk(tag: bytes, data: bytes) -> bytes:
            return (
                struct.pack(">I", len(data))
                + tag
                + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
            )

        raw = b""
        row = b"\x00" + bytes([r, g, b] * size)
        for _ in range(size):
            raw += row

        png = b"\x89PNG\r\n\x1a\n"
        png += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
        png += chunk(b"IDAT", zlib.compress(raw, 9))
        png += chunk(b"IEND", b"")

        with open(path, "wb") as f:
            f.write(png)

    write_png("public/icons/icon-192.png", 192, 245, 158, 11)
    write_png("public/icons/icon-512.png", 512, 245, 158, 11)
    print("Iconos PNG generados (sin PIL)")
else:
    for size in (192, 512):
        img = Image.new("RGB", (size, size), (15, 15, 15))
        draw = ImageDraw.Draw(img)
        margin = size // 8
        draw.rounded_rectangle(
            [margin, margin, size - margin, size - margin],
            radius=size // 6,
            fill=(245, 158, 11),
        )
        font_size = size // 4
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except OSError:
            font = ImageFont.load_default()
        text = "BS"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text(
            ((size - tw) / 2, (size - th) / 2 - bbox[1]),
            text,
            fill=(15, 15, 15),
            font=font,
        )
        img.save(f"public/icons/icon-{size}.png")
    print("Iconos PNG generados con PIL")
