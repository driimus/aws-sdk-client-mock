/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-interface */
import type { MetadataBearer } from '@smithy/types';
import assert from 'assert';
import { AwsCommand, AwsStub } from 'aws-sdk-client-mock';
import type { ExpectationResult, MatcherContext, MatcherFunction, MatcherFunctionWithContext } from 'expect';
import { expect } from 'expect';
import type { SinonSpyCall } from 'sinon';

interface AwsSdkJestMockBaseMatchers<R> extends Record<string, Function> {
    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} exact number of {@link times}
     *
     * @param command aws-sdk command constructor
     * @param times
     */
    toHaveReceivedCommandTimes<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        times: number,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} at least one time
     *
     * @param command aws-sdk command constructor
     */
    toHaveReceivedCommand<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} at least one time with matching {@link input}
     *
     * @param command aws-sdk command constructor
     * @param input
     */
    toHaveReceivedCommandWith<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        input: Partial<TCmdInput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} as defined {@link call} number
     * with matching {@link input}
     *
     * @param call call number to assert
     * @param command aws-sdk command constructor
     * @param input
     */
    toHaveReceivedNthCommandWith<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        call: number,
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        input: Partial<TCmdInput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} as defined specific {@link call}
     * number with matchin {@link input}
     *
     * @param call call number to assert
     * @param command aws-sdk command constructor
     * @param input
     */
    toHaveReceivedNthSpecificCommandWith<TCmdInput extends object, TCmdOutput extends MetadataBearer>(
        call: number,
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        input: Partial<TCmdInput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received any command
     */
    toHaveReceivedAnyCommand(): R;
}

interface AwsSdkJestMockAliasMatchers<R> extends Record<string, Function> {
    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} exact number of {@link times}
     *
     * @alias {@link AwsSdkJestMockBaseMatchers.toHaveReceivedCommandTimes}
     * @param command aws-sdk command constructor
     * @param times
     */
    toReceiveCommandTimes<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        times: number,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} at least one time
     *
     * @alias {@link AwsSdkJestMockBaseMatchers.toHaveReceivedCommand}
     * @param command aws-sdk command constructor
     */
    toReceiveCommand<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} at least one time with matching {@link input}
     *
     * @alias {@link AwsSdkJestMockBaseMatchers.toHaveReceivedCommandWith}
     * @param command aws-sdk command constructor
     * @param input
     */
    toReceiveCommandWith<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        input: Partial<TCmdInput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} as defined {@link call} number
     * with matching {@link input}
     *
     * @alias {@link AwsSdkJestMockBaseMatchers.toHaveReceivedNthCommandWith}
     * @param call call number to assert
     * @param command aws-sdk command constructor
     * @param input
     */
    toReceiveNthCommandWith<TCmdInput extends object,
        TCmdOutput extends MetadataBearer>(
        call: number,
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        input: Partial<TCmdInput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received a {@link command} as defined specific {@link call}
     * number with matchin {@link input}
     *
     * @param call call number to assert
     * @param command aws-sdk command constructor
     * @param input
     */
    toReceiveNthSpecificCommandWith<TCmdInput extends object, TCmdOutput extends MetadataBearer>(
        call: number,
        command: new (input: TCmdInput) => AwsCommand<TCmdInput, TCmdOutput>,
        input: Partial<TCmdInput>,
    ): R;

    /**
     * Asserts {@link AwsStub Aws Client Mock} received any command
     */
    toReceiveAnyCommand(): R;
}

/**
 * Provides {@link jest} matcher for testing {@link AwsStub} command calls
 *
 * @example
 *
 * ```ts
 * import { mockClient } from "aws-sdk-client-mock";
 * import { ScanCommand } from "@aws-sdk/client-dynamodb";
 *
 * const awsMock = mockClient(DynamoDBClient);
 *
 * awsMock.on(ScanCommand).resolves({
 *   Items: [{ Info: { S: '{ "val": "info" }' }, LockID: { S: "fooId" } }],
 * });
 *
 * it("Should call scan command", async () => {
 *    // check result ... maybe :)
 *    await expect(sut()).resolves.toEqual({ ... });
 *
 *    // Assert awsMock to have recevied a Scan Command at least one time
 *    expect(awsMock).toHaveReceivedCommand(ScanCommand);
 * });
 * ```
 */
export interface AwsSdkJestMockMatchers<R> extends AwsSdkJestMockBaseMatchers<R>, AwsSdkJestMockAliasMatchers<R>, Record<string, Function> {
}

/**
 * Types for @types/jest
 */
declare global {
    namespace jest {
        interface Matchers<R = void> extends AwsSdkJestMockMatchers<R> {
        }
    }
}

/**
 * Types for @jest/globals
 */
declare module 'expect' {
    interface Matchers<R = void> extends AwsSdkJestMockMatchers<R> {
    }
}

type AnyCommand = AwsCommand<any, any>;
type AnySpyCall = SinonSpyCall<[AnyCommand]>;
type MessageFunctionParams<CheckData> = {
    cmd: string;
    client: string;
    commandCalls: AnySpyCall[];
    calls: AnySpyCall[];
    data: CheckData;
    notPrefix: string;
};

type AnyMatcherContext = MatcherContext | import('@vitest/expect').MatcherState;

/**
 * Prettyprints command calls for message
 */
const printCalls = <Ctx extends AnyMatcherContext>(ctx: Ctx, calls: AnySpyCall[]): string[] =>
    calls.length > 0
        ? [
            '',
            'Calls:',
            ...calls.map(
                (c, i) =>
                    `  ${i + 1}. ${c.args[0].constructor.name}: ${ctx.utils.printReceived(
                        c.args[0].input,
                    )}`,
            )]
        : [];

const processMatch = <Ctx extends AnyMatcherContext, CheckData = undefined>({ctx, mockClient, command, check, message}: {
    ctx: Ctx;
    mockClient: unknown;
    command?: new () => AnyCommand;
    check: (params: { calls: AnySpyCall[]; commandCalls: AnySpyCall[] }) => {
        pass: boolean;
        data: CheckData;
    };
    message: (params: MessageFunctionParams<CheckData>) => string[];
}): ExpectationResult => {
    assert(mockClient instanceof AwsStub, 'The actual must be a client mock instance');
    command && assert(
        command &&
        typeof command === 'function' &&
        typeof command.name === 'string' &&
        command.name.length > 0,
        'Command must be valid AWS SDK Command',
    );

    const calls = mockClient.calls();
    const commandCalls = command ? mockClient.commandCalls(command) : [];

    const {pass, data} = check({calls, commandCalls});

    const msg = (): string => {
        const cmd = ctx.utils.printExpected(command?.name || 'Any Command');
        const client = mockClient.clientName();

        return [
            ...message({
                client,
                cmd,
                data,
                calls,
                commandCalls,
                notPrefix: ctx.isNot ? 'not ' : '',
            }),
            ...printCalls(ctx, calls),
        ].join('\n');
    };

    return {pass, message: msg};
};

const ensureNoOtherArgs = (args: unknown[]): void => {
    assert(args.length === 0, 'Too many matcher arguments');
};


export const baseMatchers = {
    /**
     * implementation of {@link AwsSdkJestMockMatchers.toHaveReceivedCommand} matcher
     */
    toHaveReceivedCommand(
        this: AnyMatcherContext,
        mockClient: unknown,
        command: new () => AnyCommand,
        ...other: unknown[]
    ) {
        ensureNoOtherArgs(other);
        return processMatch({
            ctx: this,
            mockClient,
            command,
            check: ({commandCalls}) => ({pass: commandCalls.length > 0, data: undefined}),
            message: ({client, cmd, notPrefix, commandCalls}) => [
                `Expected ${client} to ${notPrefix}receive ${cmd}`,
                `${client} received ${cmd} ${this.utils.printReceived(commandCalls.length)} times`,
            ],
        });
    },
    /**
     * implementation of {@link AwsSdkJestMockMatchers.toHaveReceivedCommandTimes} matcher
     */
    toHaveReceivedCommandTimes(
        this: MatcherContext,
        mockClient: unknown,
        command: new () => AnyCommand,
        expectedCalls: number,
        ...other: unknown[]
    ) {
        ensureNoOtherArgs(other);
        return processMatch({
            ctx: this,
            mockClient,
            command,
            check: ({commandCalls}) => ({pass: commandCalls.length === expectedCalls, data: undefined}),
            message: ({client, cmd, commandCalls, notPrefix}) => [
                `Expected ${client} to ${notPrefix}receive ${cmd} ${this.utils.printExpected(expectedCalls)} times`,
                `${client} received ${cmd} ${this.utils.printReceived(commandCalls.length)} times`,
            ],
        });
    },
    /**
     * implementation of {@link AwsSdkJestMockMatchers.toHaveReceivedCommandWith} matcher
     */
    toHaveReceivedCommandWith<T extends AnyMatcherContext>(
        this: T,
        mockClient: unknown,
        command: new () => AnyCommand,
        input: Record<string, unknown>,
        ...other: unknown[]
    ) {
        ensureNoOtherArgs(other);
        return processMatch<T, { matchCount: number }>({
            ctx: this,
            mockClient,
            command,
            check: ({commandCalls}) => {
                const matchCount = commandCalls
                    .map(call => call.args[0].input) // eslint-disable-line @typescript-eslint/no-unsafe-return
                    .map(received => this.equals(received, expect.objectContaining(input)))
                    .reduce((acc, val) => acc + Number(val), 0);

                return {pass: matchCount > 0, data: {matchCount}};
            },
            message: ({client, cmd, notPrefix, data}) => [
                `Expected ${client} to ${notPrefix}receive ${cmd} with ${this.utils.printExpected(input)}`,
                `${client} received matching ${cmd} ${this.utils.printReceived(data.matchCount)} times`,
            ],
        });
    },
    /**
     * implementation of {@link AwsSdkJestMockMatchers.toHaveReceivedNthCommandWith} matcher
     */
    toHaveReceivedNthCommandWith<T extends AnyMatcherContext>(
        this: T,
        mockClient: unknown,
        call: number,
        command: new () => AnyCommand,
        input: Record<string, unknown>,
        ...other: unknown[]
    ) {
        ensureNoOtherArgs(other);
        assert(
            call && typeof call === 'number' && call > 0,
            'Call number must be a number greater than 0',
        );

        return processMatch<T, { received: AnyCommand | undefined }>({
            ctx: this,
            mockClient,
            command,
            check: ({calls}) => {
                if (calls.length < call) {
                    return {pass: false, data: {received: undefined}};
                }

                const received = calls[call - 1].args[0];

                let pass = false;
                if (received instanceof command) {
                    pass = this.equals(received.input, expect.objectContaining(input));
                }

                return {
                    pass,
                    data: {received},
                };
            },
            message: ({cmd, client, data, notPrefix}) => [
                `Expected ${client} to ${notPrefix}receive ${call}. ${cmd} with ${this.utils.printExpected(input)}`,
                ...(data.received
                    ? [
                        `${client} received ${this.utils.printReceived(data.received.constructor.name)} with input:`,
                        this.utils.printDiffOrStringify(
                            input,
                            data.received.input,
                            'Expected',
                            'Received',
                            false,
                        ),
                    ]
                    : []),
            ],
        });
    },
    /**
     * implementation of {@link AwsSdkJestMockMatchers.toHaveReceivedNthSpecificCommandWith} matcher
     */
    toHaveReceivedNthSpecificCommandWith<T extends AnyMatcherContext>(
        this: T,
        mockClient: unknown,
        call: number,
        command: new () => AnyCommand,
        input: Record<string, unknown>,
        ...other: unknown[]
    ) {
        ensureNoOtherArgs(other);
        assert(
            call && typeof call === 'number' && call > 0,
            'Call number must be a number greater than 0',
        );

        return processMatch<T, { received: AnyCommand | undefined }>({
            ctx: this,
            mockClient,
            command,
            check: ({commandCalls}) => {
                if (commandCalls.length < call) {
                    return {pass: false, data: {received: undefined}};
                }

                const received = commandCalls[call - 1].args[0];

                let pass = false;
                if (received instanceof command) {
                    pass = this.equals(received.input, expect.objectContaining(input));
                }

                return {
                    pass,
                    data: {received},
                };
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            message: ({cmd, client, data, notPrefix}) => [
                `Expected ${client} to ${notPrefix}receive ${call}. ${cmd} with ${this.utils.printExpected(input)}`,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                ...(data.received
                    ? [
                        `${client} received ${this.utils.printReceived(data.received.constructor.name)} with input:`,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        this.utils.printDiffOrStringify(
                            input,
                            data.received.input,
                            'Expected',
                            'Received',
                            false,
                        ),
                    ]
                    : []),
            ],
        });
    },
    /**
     * implementation of {@link AwsSdkJestMockMatchers.toHaveReceivedAnyCommand} matcher
     */
    toHaveReceivedAnyCommand(
        this: MatcherContext,
        mockClient: unknown,
        ...other: unknown[]
    ) {
        ensureNoOtherArgs(other);
        return processMatch({
            ctx: this,
            mockClient,
            check: ({calls}) => ({pass: calls.length > 0, data: undefined}),
            message: ({client, notPrefix, calls}) => [
                `Expected ${client} to ${notPrefix}receive any command`,
                `${client} received any command ${this.utils.printReceived(calls.length)} times`,
            ],
        });
    },
};

/* typing ensures keys matching */
const aliasMatchers: Matchers<MatcherContext> = {
    toReceiveCommandTimes: baseMatchers.toHaveReceivedCommandTimes,
    toReceiveCommand: baseMatchers.toHaveReceivedCommand,
    toReceiveCommandWith: baseMatchers.toHaveReceivedCommandWith,
    toReceiveNthCommandWith: baseMatchers.toHaveReceivedNthCommandWith,
    toReceiveNthSpecificCommandWith: baseMatchers.toHaveReceivedNthSpecificCommandWith,
    toReceiveAnyCommand: baseMatchers.toHaveReceivedAnyCommand,
};
// import type { ExpectationResult } from 'expect';
type Matchers<Ctx> = { [P in keyof AwsSdkJestMockAliasMatchers<unknown>]: (this: Ctx, received: any, expected: any, options?: any)=> ExpectationResult; }

export default {
    ...baseMatchers,
    ...aliasMatchers,
}
