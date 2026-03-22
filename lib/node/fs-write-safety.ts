import path from 'node:path'

type NodeFsError = Error & {
    code?: string
}

const READ_ONLY_FS_CODES = new Set(['EROFS', 'EPERM', 'EACCES'])

export function resolveWritableDataPath(fileName: string): string {
    const configuredDir = process.env.YOUTUBE_DATA_DIR?.trim()
    if (configuredDir) {
        return path.join(configuredDir, fileName)
    }

    if (isServerlessRuntime()) {
        return path.join('/tmp', fileName)
    }

    return path.join(process.cwd(), 'data', fileName)
}

export function isReadOnlyFileSystemError(error: unknown): boolean {
    if (!(error instanceof Error)) return false

    const code = (error as NodeFsError).code
    if (code && READ_ONLY_FS_CODES.has(code)) return true

    return /read-only file system/i.test(error.message)
}

function isServerlessRuntime(): boolean {
    return Boolean(
        process.env.NETLIFY ||
            process.env.AWS_LAMBDA_FUNCTION_NAME ||
            process.env.VERCEL ||
            process.env.RENDER
    )
}


