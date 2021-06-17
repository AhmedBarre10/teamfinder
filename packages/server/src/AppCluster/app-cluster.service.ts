import * as cluster from "cluster";
import * as os from "os";
import { Injectable } from "@nestjs/common";

const numberOfCpus = os.cpus().length;

@Injectable()
export class AppClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      for (let i = 0; i < numberOfCpus; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker, code, signal) => {
        cluster.fork();
      });
    } else {
      callback();
    }
  }
}
