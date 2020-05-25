import { Request, Response, NextFunction } from 'express';
import { AsyncFunction } from '../../types/common';
import os from 'os';

/**
 * Async function wrapper to catch errors and hand them
 * to the error handling middleware
 * @param foo AsyncFunction
 */
export const asyncWrapper = (foo: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        foo(req, res, next).catch(next);
    };
};

/**
 * Check if value is a shiro-like string
 * in the form of root:sub:* or root:*
 * @todo: improve regex
 * @param value string
 */
export const isShiroRootLvl = (value: string) => {
    const regEx = /^\w+(:\w+)?:\*$/;
    return regEx.test(value);
};

/**
 * Check if value is a shiro-like string
 * in the form of root:sub:sub or root:sub
 * @todo: improve regex
 * @param value string
 */
export const isShiro = (value: string) => {
    const regEx = /^\w+(:\w+)?:\w+$/;
    return regEx.test(value);
};

/**
 * Returns local network interfaces.
 * Not sure if this works on windows
 */
export const getNetInterfaces = () => {
    const ifaces = os.networkInterfaces();
    const netInterfaces: string[] = [];

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                netInterfaces.push(iface.address);
            } else {
                // this interface has only one ipv4 adress
                netInterfaces.push(iface.address);
            }
            ++alias;
        });
    });

    return netInterfaces;
};
