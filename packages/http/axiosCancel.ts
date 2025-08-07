// export class AxiosCanceler {
//   private pendingMap: Map<string, AbortController> = new Map();

//   addPending(config: any) {
//     this.removePending(config);
//     const controller = new AbortController();
    
//   }

//   removePending(config: any) {
//     const url = this.getPendingUrl(config);
//     if (this.pendingMap.has(url)) {
//       const controller = this.pendingMap.get(url);
//       controller.abort();
//       this.pendingMap.delete(url);
//     }
//   }

//   getPendingUrl(config: any) {
//     return [config.method, config.url].join('&');
//   }
// }