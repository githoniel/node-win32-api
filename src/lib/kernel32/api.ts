import * as GT from '../types'
import * as W from '../windef'

export interface Win32Fns {
    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms679351(v=vs.85).aspx
    // dwLanguageId: https://msdn.microsoft.com/en-us/library/windows/desktop/dd318693(v=vs.85).aspx
    FormatMessageW(
        dwFlags: GT.DWORD,
        lpSource: GT.LPCVOID | null,
        dwMessageId: GT.DWORD,
        dwLanguageId: GT.DWORD,     // 0x0409: US, 0x0000: Neutral locale language
        lpBuffer: GT.LPTSTR,
        nSize: GT.DWORD,
        Arguments: GT.va_list | null
    ): GT.DWORD

    GetLastError(): GT.DWORD

    GetModuleHandleW(lpModuleName: GT.LPCTSTR | null): GT.HMODULE

    GetModuleHandleExW(dwFlags: GT.DWORD, lpModuleName: GT.LPCTSTR | null, phModule: GT.HMODULE): GT.BOOL

    GetProcessHeaps(NumberOfHeaps: GT.DWORD, ProcessHeaps: GT.PHANDLE): GT.DWORD

    HeapFree(hHeap: GT.HANDLE, dwFlags: GT.DWORD, lpMem: GT.LPVOID | null): GT.BOOL

    OpenProcess(dwDesiredAccess: GT.DWORD, bInheritHandle: GT.BOOL, dwProcessId: GT.DWORD): GT.HANDLE

    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381(v=vs.85).aspx
    SetLastError(dwErrCode: GT.DWORD): GT.VOID
}

export const apiDef: GT.ApiDef = {
    FormatMessageW: [W.DWORD, [W.DWORD, W.LPCVOID, W.DWORD, W.DWORD, W.LPTSTR, W.DWORD, W.va_list]],

    // err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx
    GetLastError: [W.DWORD, []],

    GetModuleHandleW: [W.HMODULE, [W.LPCTSTR]],    // retrive value from buf by ret.ref().readUInt32()

    GetModuleHandleExW: [W.BOOL, [W.DWORD, W.LPCTSTR, W.HMODULE]],     // flags, optional LPCTSTR name, ref hModule

    GetProcessHeaps: [W.DWORD, [W.DWORD, W.PHANDLE]],

    HeapFree: [W.BOOL, [W.HANDLE, W.DWORD, W.LPVOID]],

    OpenProcess: [W.HANDLE, [W.DWORD, W.BOOL, W.DWORD]],

    SetLastError: [W.VOID, [W.DWORD]],
}
