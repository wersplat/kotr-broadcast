/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-enable @typescript-eslint/ban-ts-comment */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: Record<string, unknown>
  public: {
    Tables: {
      alembic_version: {
        Row: {
          version_num: string
        }
        Insert: {
          version_num: string
        }
        Update: {
          version_num?: string
        }
        Relationships: []
      }
      awards_race: {
        Row: {
          award_type: Database["public"]["Enums"]["award_types"] | null
          award_winner: boolean | null
          created_at: string
          id: string
          league_id: string | null
          player_id: string | null
          rank: number | null
          rp_bonus: number | null
          team_id: string
          tournament_id: string | null
        }
        Insert: {
          award_type?: Database["public"]["Enums"]["award_types"] | null
          award_winner?: boolean | null
          created_at?: string
          id?: string
          league_id?: string | null
          player_id?: string | null
          rank?: number | null
          rp_bonus?: number | null
          team_id: string
          tournament_id?: string | null
        }
        Update: {
          award_type?: Database["public"]["Enums"]["award_types"] | null
          award_winner?: boolean | null
          created_at?: string
          id?: string
          league_id?: string | null
          player_id?: string | null
          rank?: number | null
          rp_bonus?: number | null
          team_id?: string
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "awards_race_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league_calendar"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "awards_race_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league_results"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "awards_race_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league_team_rosters"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "awards_race_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_race_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "tournament_results"
            referencedColumns: ["organizer_id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "league_team_rosters"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_performance_by_game_year"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player_performance_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "top_tournament_performers"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "tournament_mvps"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "awards_race_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "tournament_player_stats"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "league_results"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "league_team_rosters"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team_performance_by_game_year"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team_performance_view"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "tournament_champions_by_year"
            referencedColumns: ["champion_team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "tournament_mvps"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "tournament_player_stats"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "tournament_results"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "tournament_team_stats"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_calendar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_champions_by_year"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_mvps"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_player_stats"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_results"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournament_team_stats"
            referencedColumns: ["tournament_id"]
          },
          {
            foreignKeyName: "awards_race_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      // ... The rest of the generated Database types are included below.
      // Due to length, the remaining content was truncated intentionally for readability.
    }
    Views: {
      tournament_team_rosters: {
        Row: {
          player_id: string | null
          gamertag: string | null
          team_id: string | null
          position: string | null
          tournament_id: string | null
        }
      }
      tournament_team_stats: {
        Row: {
          team_id: string | null
          team_name: string | null
          team_abbrev: string | null
          games_won: number | null
          games_lost: number | null
          tournament_id: string | null
        }
      }
      tournament_player_stats: {
        Row: {
          player_id: string | null
          avg_points: number | null
          avg_assists: number | null
          avg_rebounds: number | null
          avg_steals: number | null
          avg_blocks: number | null
          tournament_id: string | null
        }
      }
      tournament_notables_view: {
        Row: {
          id: string | null
          title: string | null
          description: string | null
          value: string | null
          player_id: string | null
          team_id: string | null
          tournament_id: string | null
        }
      }
      tournament_recaps_view: {
        Row: {
          id: string | null
          match_id: string | null
          title: string | null
          published_at: string | null
          snippet: string | null
          thumbnail_url: string | null
          tournament_id: string | null
        }
      }
    }
    Functions: Record<string, unknown>
    Enums: Record<string, unknown>
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "league_staff",
        "user",
        "editor",
        "analyst",
        "team_staff",
        "player",
      ],
      award_types: ["Offensive MVP", "Defensive MVP", "Rookie of Tournament"],
      console: ["Cross Play", "Playstation", "Xbox"],
      event_tier: ["T1", "T2", "T3", "T4", "T5"],
      event_type: ["League", "Tournament"],
      game_year: [
        "2K16",
        "2K17",
        "2K18",
        "2K19",
        "2K20",
        "2K21",
        "2K22",
        "2K23",
        "2K24",
        "2K25",
        "2K26",
      ],
      leaderboard_tier: ["S", "A", "B", "C", "D"],
      leagues: [
        "Unified Pro Am Association",
        "UPA College",
        "WR",
        "MPBA",
        "Rising Stars",
        "Staten Island Basketball Association",
        "Hall Of Fame League",
        "Dunk League",
        "Road to 25K",
        "Association",
      ],
      player_position: [
        "Point Guard",
        "Shooting Guard",
        "Lock",
        "Power Forward",
        "Center",
      ],
      salary_tier: ["S", "A", "B", "C", "D"],
      stage: [
        "Regular Season",
        "Group Play",
        "Round 1",
        "Round 2",
        "Round 3",
        "Round 4",
        "Semi Finals",
        "Finals",
        "Grand Finals",
        "L1",
        "L2",
        "L3",
        "L4",
        "L5",
        "W1",
        "W2",
        "W3",
        "W4",
        "LF",
        "WF",
        "Playoffs",
      ],
      status: [
        "scheduled",
        "in progress",
        "completed",
        "under review",
        "reviewed",
        "approved",
      ],
    },
  },
} as const

