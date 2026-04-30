import argparse

from .pipeline import ProcessingPipeline


def main() -> None:
    parser = argparse.ArgumentParser(description="Process placement prep raw materials.")
    parser.add_argument("--raw-only", action="store_true", help="Only process /raw_material, not existing repo folders.")
    parser.add_argument("--watch", action="store_true", help="Continuously watch for new files.")
    parser.add_argument("--interval", type=int, default=5, help="Watch polling interval in seconds.")
    args = parser.parse_args()

    pipeline = ProcessingPipeline()
    print(pipeline.process_all(include_existing_materials=not args.raw_only))
    if args.watch:
        watcher = pipeline.watch(args.interval, include_existing_materials=not args.raw_only)
        print(f"Watching every {args.interval}s. Press Ctrl+C to stop.")
        try:
            while True:
                watcher.stop_event.wait(3600)
        except KeyboardInterrupt:
            watcher.stop()


if __name__ == "__main__":
    main()

