import JSZip from 'jszip'

export interface AvatarDecorationData {
  readonly sku_id: string
  readonly asset: string
}

export interface MutedChannelConfig {
  readonly selected_time_window: number
  readonly end_time: string
}

export interface ChannelOverride {
  readonly muted: boolean
  readonly mute_config: MutedChannelConfig
  readonly message_notifications: number
  readonly collapsed: boolean
  readonly channel_id: string
}

export interface UserGuildEntry {
  readonly version: number
  readonly suppress_roles: boolean
  readonly suppress_everyone: boolean
  readonly notify_highlights: number
  readonly muted: boolean
  readonly mute_scheduled_events: boolean
  readonly mute_config: null
  readonly mobile_push: boolean
  readonly message_notifications: number
  readonly hide_muted_channels: boolean
  readonly guild_id: null
  readonly flags: number
  readonly channel_overrides: Array<ChannelOverride>
}

export interface UserGuildSettings {
  readonly version: number
  readonly partial: boolean
  readonly entries: Array<UserGuildEntry>
}

export interface User {
  readonly username: string
  readonly public_flags: number
  readonly id: string
  readonly global_name: string
  readonly display_name?: string
  readonly discriminator: string
  readonly clan: null
  readonly bot?: boolean
  readonly avatar_decoration_data: AvatarDecorationData
  readonly avatar: string
}

export interface Self {
  readonly verified: boolean
  readonly username: string
  readonly purchased_flags: number
  readonly public_flags: number
  readonly pronouns: string
  readonly premium_usage_flags: number
  readonly premium_type: number
  readonly phone: string
  readonly nsfw_allowed: boolean
  readonly mobile: boolean
  readonly mfa_enabled: boolean
  readonly id: string
  readonly global_name: string
  readonly flags: number
  readonly email: string
  readonly discriminator: string
  readonly desktop: boolean
  readonly clan: null
  readonly bio: string
  readonly banner: string
  readonly avatar_decoration_data: AvatarDecorationData
  readonly avatar: string
  readonly accent_color: number
}

export interface ClientInfo {
  readonly version: number
  readonly os: string
  readonly client: string
}

export interface ActivityEmoji {
  readonly name: string
  readonly id: string
  readonly animated: boolean
}

export interface Activity {
  readonly type: number
  readonly state: string
  readonly name: string
  readonly id: string
  readonly emoji: ActivityEmoji
  readonly created_at: number
}

export interface Session {
  readonly status: string
  readonly session_id: string
  readonly client_info: ClientInfo
  readonly activities: Array<Activity>
  readonly active: boolean
}

export interface Relationship {
  readonly type: number
  readonly since: string
  readonly nickname: string
  readonly id: string
  readonly user: User
}

export interface ReadStateEntry1 {
  readonly mention_count: number
  readonly last_pin_timestamp: string
  readonly last_message_id: string
  readonly id: string
  readonly flags: number
}
export interface ReadStateEntry2 {
  readonly read_state_type: number
  readonly last_acked_id: string
  readonly id: string
  readonly badge_count: number
}

export type ReadStateEntry = ReadStateEntry1 | ReadStateEntry2

export interface ReadState {
  readonly version: number
  readonly partial: boolean
  readonly entries: Array<ReadStateEntry>
}

export interface PrivateChannel {
  readonly type: number
  readonly safety_warnings?: Array<any>
  readonly owner_id?: string
  readonly name?: string
  readonly last_pin_timestamp?: string
  readonly last_message_id: string
  readonly is_spam?: boolean
  readonly is_message_request_timestamp?: string
  readonly is_message_request?: boolean
  readonly id: string
  readonly icon?: string
  readonly flags: number
  readonly recipients: Array<User>
}

export interface NotificationSetting {
  readonly flags: number
}

export interface Member {
  readonly roles: Array<string>
  readonly premium_since: string
  readonly pending: boolean
  readonly nick: string
  readonly mute: boolean
  readonly joined_at: string
  readonly flags: 0
  readonly deaf: boolean
  readonly communication_disabled_until: string
  readonly avatar: null
  readonly user: User
}

export type MergedMembers = Array<Member>

export interface Sticker {
  readonly type: number
  readonly tags: string
  readonly name: string
  readonly id: string
  readonly guild_id: string
  readonly format_type: number
  readonly description: string
  readonly available: boolean
  readonly asset: string
}

export type Feature = "THREADS_ENABLED" | "VANITY_URL" | "AUTO_MODERATION" | "MEMBER_VERIFICATION_GATE_ENABLED" | "TEXT_IN_VOICE_ENABLED" | "NEW_THREAD_PERMISSIONS" | "INVITE_SPLASH" | "PRIVATE_THREADS" | "NEWS" | "SEVEN_DAY_THREAD_ARCHIVE" | "MEMBER_PROFILES" | "GUILD_WEB_PAGE_VANITY_URL" | "AUTOMOD_TRIGGER_USER_PROFILE" | "BANNER" | "SOUNDBOARD" | "CREATOR_MONETIZABLE_PROVISIONAL" | "THREE_DAY_THREAD_ARCHIVE" | "COMMUNITY" | "CREATOR_ACCEPTED_NEW_TERMS" | "GUILD_SERVER_GUIDE" | "PREVIEW_ENABLED" | "ROLE_SUBSCRIPTIONS_ENABLED" | "ANIMATED_ICON" | "WELCOME_SCREEN_ENABLED" | "CHANNEL_ICON_EMOJIS_GENERATED" | "DISCOVERABLE" | "ENABLED_DISCOVERABLE_BEFORE" | "ANIMATED_BANNER" | "GUILD_ONBOARDING_EVER_ENABLED" | "ROLE_ICONS" | "GUILD_HOME_TEST"

export interface IncidentData {
  raid_detected_at: string
  invites_disabled_until: string
  dms_disabled_until: string
  dm_spam_detected_at: string
}

export interface GuildProperties {
  readonly max_video_channel_users: number,
  readonly features: Array<Feature>
  readonly default_message_notifications: number
  readonly system_channel_flags: number
  readonly max_members: number
  readonly id: string
  readonly hub_type: null
  readonly name: string
  readonly explicit_content_filter: number
  readonly afk_channel_id: string
  readonly preferred_locale: string
  readonly nsfw_level: number
  readonly clan: null
  readonly safety_alerts_channel_id: string
  readonly description: string
  readonly premium_tier: number
  readonly latest_onboarding_question_id: string
  readonly splash: string
  readonly incidents_data: IncidentData
  readonly application_id: string
  readonly rules_channel_id: string
  readonly system_channel_id: string
  readonly public_updates_channel_id: string
  readonly max_stage_video_channel_users: number
  readonly premium_progress_bar_enabled: boolean
  readonly discovery_splash: string
  readonly owner_id: string
  readonly verification_level: number
  readonly vanity_url_code: string
  readonly afk_timeout: number
  readonly nsfw: boolean
  readonly home_header: string
  readonly icon: string
  readonly mfa_level: number
  readonly banner: string
}

export type RecurrenceInterval = Array<number>

export interface RecurrenceRule {
  readonly start: string
  readonly interval: number
  readonly frequency: number
  readonly end: string
  readonly count: number
  readonly by_year_day: RecurrenceInterval
  readonly by_weekday: RecurrenceInterval
  readonly by_n_weekday: RecurrenceInterval
  readonly by_month_day: RecurrenceInterval
  readonly by_month: RecurrenceInterval
}

export interface EntityMetadata {
  readonly speaker_ids: Array<string>
}

export interface ScheduledEventExceptions {
  readonly scheduled_start_time: string
  readonly scheduled_end_time: string
  readonly is_canceled: boolean
  readonly guild_id: string
  readonly event_id: string
  readonly event_exception_id: string
}

export interface ScheduledEvent {
  readonly status: number
  readonly sku_ids: Array<string>
  readonly scheduled_start_time: string
  readonly scheduled_end_time: string
  readonly recurrence_rule: RecurrenceRule
  readonly privacy_level: number
  readonly name: string
  readonly image: string
  readonly id: string
  readonly guild_scheduled_event_exceptions: Array<ScheduledEventExceptions>
  readonly guild_id: string
  readonly entity_type: number
  readonly entity_metadata: EntityMetadata
  readonly entity_id: string
  readonly description: string
  readonly creator_id: string
  readonly channel_id: string
  readonly auto_start: boolean
}

export interface Emoji {
  readonly roles: Array<string>
  readonly require_colons: boolean
  readonly name: string
  readonly managed: boolean
  readonly id: string
  readonly available: boolean
  readonly animated: boolean
}

export interface PermissionOverwrite {
  readonly type: number
  readonly id: string
  readonly deny: string
  readonly allow: string
}

export interface ChannelIconEmoji {
  readonly name: string
  readonly id: string
}

export interface Channel {
  readonly type: number
  readonly topic: string
  readonly theme_color: number
  readonly rate_limit_per_user: number
  readonly position: number
  readonly permission_overwrites: PermissionOverwrite
  readonly parent_id: string
  readonly nsfw: boolean
  readonly name: string
  readonly last_message_id: string
  readonly id: string
  readonly icon_emoji: ChannelIconEmoji
  readonly flags: number
  readonly guild_id: string
}

export interface Guild {
  readonly version: number
  readonly threads: []
  readonly stickers: Array<Sticker>
  readonly properties: GuildProperties
  readonly premium_subscription_count: number
  readonly member_count: number
  readonly lazy: boolean
  readonly large: boolean
  readonly joined_at: string
  readonly id: string
  readonly guild_scheduled_events: Array<ScheduledEvent>
  readonly emojis: Array<Emoji>
  readonly data_mode: string
  readonly channels: Array<Channel>
  readonly application_command_counts: any
  readonly activity_instances?: any
  readonly members: Array<Member>
}

export interface GuildJoinRequest {
  readonly user_id: string
  readonly rejection_reason: string
  readonly last_seen: string
  readonly join_request_id: string
  readonly interview_channel_id: string
  readonly id: string
  readonly guild_id: string
  readonly created_at: string
  readonly application_status: string
}

export interface Personalization {
  readonly consented: boolean
}

export interface Consents {
  readonly personalization: Personalization
}

export interface ConnectedAccounts {
  readonly visibility: number
  readonly verified: boolean
  readonly type: string
  readonly two_way_link: boolean
  readonly show_activity: boolean
  readonly revoked: boolean
  readonly name: string
  readonly metadata_visibility: number
  readonly id: string
  readonly friend_sync: boolean
  readonly access_token?: string
}

export interface Auth {
  readonly authenticator_types: Array<number>
}

export interface Gateway {
  readonly v: string
  readonly users: Array<User>
  readonly user_settings_proto: string
  readonly user_guild_settings: UserGuildSettings
  readonly user: Self
  readonly tutorial: boolean
  readonly sessions: Array<Session>
  readonly session_type: string
  readonly session_id: string
  readonly resume_gateway_url: string
  readonly relationships: Array<Relationship>
  readonly read_state: ReadState
  readonly private_channels: Array<PrivateChannel>
  readonly notification_settings: NotificationSetting
  readonly merged_members: Array<MergedMembers>
  readonly guilds: Array<Guild>
  readonly guild_join_requests: Array<GuildJoinRequest>
  readonly guild_experiments: Array<any>
  readonly geo_ordered_rtc_regions: Array<string>
  readonly friend_suggestion_count: number
  readonly experiments: Array<Array<number>>
  readonly country_code: string
  readonly consents: Consents
  readonly connected_accounts: Array<ConnectedAccounts>
  readonly auth_session_id_hash: string
  readonly auth: Auth
  readonly api_code_version: number
  readonly analytics_token: string
  readonly _trace: Array<string>
}

export interface ZipInterface {
  emojis: JSZip | null
  stickers: JSZip | null
  soundEffects: JSZip | null
}

export interface MediaInterface {
  zipFile: ZipInterface
  sticker(id: string): string
  emoji(id: string, animated?: boolean): string
  download(url: string, destination: string, name: string): Promise<void>
}

export interface ParsedEmoji extends Emoji {
  readonly original: string
}
