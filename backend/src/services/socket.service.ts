let ioInstance: any = null

export const setIO = (io: any) => {
  ioInstance = io
}

export const getIO = () => ioInstance