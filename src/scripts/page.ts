/**
 * Runs `setup` for the page in view: now, and again after each page swap by the client router.
 * The swap event fires before the new page is drawn, so setup may change what is shown. The signal
 * aborts when the next page arrives; pass it to addEventListener so listeners leave with their page.
 */
export function onPage(setup: (signal: AbortSignal) => void) {
  let controller: AbortController | undefined;
  const run = () => {
    controller?.abort();
    controller = new AbortController();
    setup(controller.signal);
  };
  run();
  document.addEventListener("astro:after-swap", run);
}
