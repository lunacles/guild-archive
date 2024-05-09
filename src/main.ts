import JSZip from 'jszip'
import fetch, { Response } from 'node-fetch'
import gateway from '../gateway.json'
import fs, { WriteStream } from 'fs'
import path from 'path'

import {
  Emoji,
  Gateway,
  MediaInterface,
  ParsedEmoji
} from './types.js'

const zip = new JSZip()

const Media: MediaInterface = {
  zipFile: {
    emojis: zip.folder('emojis'),
    stickers: zip.folder('stickers'),
    soundEffects: zip.folder('sounds'),
  },
  sticker(id: string): string {
    return `https://media.discordapp.net/stickers/${id}.png?size=1024`
  },
  emoji(id: string, animated: boolean = false): string {
    return `https://cdn.discordapp.com/emojis/${id}.${['png', 'gif'][+animated]}?size=1024&quality=lossless`
  },
  async download(url: string, destination: string, name: string): Promise<void> {
    try {
      destination = path.resolve(destination)
      name = path.basename(name)

      await fs.promises.mkdir(destination, { recursive: true })

      let filePath: string = path.join(destination, name)
      console.log(`Starting download to: ${filePath}`)

      let response: Response = await fetch(url)
      if (!response.ok) {
        if (response.statusText === 'Not Found') {
          return
        } else if (response.statusText === 'Unsupported Media Type') {
          url = url.replace('gif', 'png')
        } else {
          throw new Error(`Failed to download file: ${response.statusText}`)
        }
      }

      let fileStream: WriteStream = fs.createWriteStream(filePath)
      return new Promise((resolve, reject): void => {
        if (!response.body) throw new Error('Response body is null')

        response.body.pipe(fileStream)
        response.body.on('error', err => {
          console.error('Error in response stream:', err)
          reject(err)
        })
        fileStream.on('finish', () => {
          console.log(`Download finished: ${filePath}`)
          resolve()
        })
        fileStream.on('error', err => {
          console.error('Error in file stream:', err)
          reject(err)
        })
      })
    } catch (err) {
      console.error('Download failed:', err)
      throw err
    }
  }
}

const gatewayData: Gateway = gateway as Gateway

const parseEmoji = (emojis: Array<Emoji>): Array<Emoji | ParsedEmoji> => {
  let count: Record<string, number> = {}
  let combobulated: Array<Emoji | ParsedEmoji> = []
  let custom: Record<string, Emoji | ParsedEmoji> = {}
  let byName: Record<string, Emoji> = {}
  let byId: Record<string, Emoji> = {}

  const combobulate = (emoji: Emoji) => {
    let originalName: string = emoji.name
    let existingCount: number = count[originalName] ?? 0
    count[originalName] = existingCount + 1
    let parsedEmoji: ParsedEmoji | Emoji = emoji

    if (existingCount > 0) {
      let name: string = `${originalName}~${existingCount}`
      parsedEmoji = Object.assign(emoji, { name, original: originalName })
    }

    byName[emoji.name] = emoji
    if (emoji.id) {
      byId[emoji.id] = emoji
      custom[emoji.name] = emoji
    }
    combobulated.push(emoji)
  }

  for (let emoji of emojis)
    combobulate(emoji)

  return combobulated
}
let startPosition = gatewayData.guilds.findIndex(guild => guild.id === '800135755220910152')
let guilds = gatewayData.guilds//.slice(startPosition, gatewayData.guilds.length - 1)


for (let guild of guilds) {
  let path: string = `./saved/${guild.id}/`
  let emojis: Array<Emoji | ParsedEmoji> = parseEmoji(guild.emojis)

  for (let emoji of emojis)
    await Media.download(Media.emoji(emoji.id, emoji.animated), path + 'emojis/', `${emoji.id}_${emoji.name}.${['png', 'gif'][+emoji.animated]}`)

  for (let sticker of guild.stickers)
    await Media.download(Media.sticker(sticker.id), path + 'stickers/', `${sticker.id}_${sticker.name}.png`)
}
