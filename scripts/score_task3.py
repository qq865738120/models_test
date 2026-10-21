#!/usr/bin/env python3
"""Score the archived dispatch API in a fresh offline Node process."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from evalkit.manager import main

if __name__ == '__main__':
    raise SystemExit(main(['auto-grade', '--task', '3', *sys.argv[1:]]))
