'use client'

import { Trophy, Award, Flame, Target, Zap, Star, TrendingUp, Users, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Badge {
  id: string
  name: string
  description: string
  icon: typeof Trophy
  earned: boolean
  progress?: number
}

interface Achievement {
  id: string
  name: string
  description: string
  points: number
  icon: typeof Trophy
  earned: boolean
  earnedDate?: string
}

export function DashboardGamification() {
  // Gamification data - Variable Reward
  const badges: Badge[] = [
    {
      id: '1',
      name: 'First Connection',
      description: 'Connect with your first collaborator',
      icon: Users,
      earned: true,
    },
    {
      id: '2',
      name: 'Profile Complete',
      description: 'Complete 100% of your profile',
      icon: Target,
      earned: false,
      progress: 75,
    },
    {
      id: '3',
      name: 'Message Master',
      description: 'Send 50 messages',
      icon: MessageSquare,
      earned: false,
      progress: 60,
    },
    {
      id: '4',
      name: 'Top Rated',
      description: 'Achieve 5-star rating',
      icon: Star,
      earned: true,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Early Adopter',
      description: 'Joined in the first month',
      points: 100,
      icon: Zap,
      earned: true,
      earnedDate: '2025-01-15',
    },
    {
      id: '2',
      name: 'Social Butterfly',
      description: 'Connect 10 social accounts',
      points: 250,
      icon: TrendingUp,
      earned: false,
    },
    {
      id: '3',
      name: 'Collaboration King',
      description: 'Complete 5 collaborations',
      points: 500,
      icon: Trophy,
      earned: false,
    },
  ]

  const totalPoints = 1250
  const currentStreak = 7
  const longestStreak = 12

  return (
    <div className="space-y-6">
      {/* Points & Streak - Goal Gradient Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent-3/10 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-aurora-1 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-display font-extrabold text-foreground">{totalPoints.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 bg-gradient-to-br from-accent-2/10 to-accent-5/10 border-accent-2/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-aurora-2 flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-display font-extrabold text-foreground">{currentStreak} days</p>
              <p className="text-xs text-muted-foreground">Best: {longestStreak} days</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 bg-gradient-to-br from-accent-3/10 to-accent-4/10 border-accent-3/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
              <p className="text-2xl font-display font-extrabold text-foreground">
                {badges.filter(b => b.earned).length}/{badges.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Achievements - Variable Reward */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-extrabold flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Recent Achievements
          </h3>
          <span className="text-xs text-muted-foreground">Keep going!</span>
        </div>
        <div className="space-y-3">
          {achievements.slice(0, 2).map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  achievement.earned
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted/50 border border-border'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.earned
                      ? 'bg-gradient-aurora-1'
                      : 'bg-muted'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {achievement.name}
                    </p>
                    {achievement.earned && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        +{achievement.points} pts
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earnedDate && (
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Badges Progress - Goal Gradient Effect */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-extrabold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Badges
          </h3>
          <span className="text-xs text-muted-foreground">
            {badges.filter(b => b.earned).length} of {badges.length} earned
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border transition-all ${
                  badge.earned
                    ? 'bg-gradient-aurora-1/20 border-primary/30'
                    : 'bg-muted/30 border-border'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  badge.earned
                    ? 'bg-gradient-aurora-1'
                    : 'bg-muted'
                }`}>
                  <Icon className={`w-5 h-5 ${badge.earned ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <p className={`text-sm font-semibold mb-1 ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {badge.name}
                </p>
                {!badge.earned && badge.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-aurora-1 transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{badge.progress}%</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

