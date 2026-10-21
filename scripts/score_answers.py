#!/usr/bin/env python3
"""Score a run's pinned long-reading answers without executing submissions."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from evalkit.manager import main

if __name__ == '__main__':
    raise SystemExit(main(['grade', *sys.argv[1:]]))
