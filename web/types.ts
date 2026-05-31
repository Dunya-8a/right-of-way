// Right of Way — TypeScript mirror of row/contracts.py (WS0).
//
// Keep this in lockstep with the pydantic models. If a field changes in
// contracts.py, change it here and tell the room. The viz (WS5) imports
// `Timeline` from this file and plays back web/sample_timeline.json.
//
// Units: positions r in km (ECI); velocities/delta-v in km/s; times in seconds
// since the scenario epoch; priority is an int where higher = more important.

export type Vec3 = [number, number, number];

export interface State {
  r: Vec3; // position [x, y, z], km
  v: Vec3; // velocity [vx, vy, vz], km/s
}

export type SpaceObjectType = "sat" | "debris";

export interface SpaceObject {
  id: string;
  type: SpaceObjectType;
  tle?: [string, string] | null; // optional two-line element set
  state?: State | null; // Cartesian state at epoch
  fuel_budget_dv: number; // remaining maneuver budget, km/s (~0 = immobile)
  priority: number; // higher = more right of way
}

export interface Scenario {
  objects: SpaceObject[];
  epoch: string; // ISO-8601 UTC, t=0
  screen_window_s: number;
  conjunction_threshold_km: number;
}

export interface Conjunction {
  a_id: string;
  b_id: string;
  tca: number; // time of closest approach, sec since epoch
  miss_distance_km: number;
  rel_speed: number; // km/s at TCA
}

export interface ManeuverProposal {
  proposer_id: string;
  dv_vector: Vec3; // delta-v [dvx, dvy, dvz], km/s, ECI
  t_burn: number; // sec since epoch
  est_dv_cost: number; // |dv|, km/s
  rationale: string;
}

export type NegotiationMsgType = "propose" | "counter" | "accept" | "yield";

export interface NegotiationMsg {
  from_id: string;
  to_id: string;
  type: NegotiationMsgType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>;
}

// --- Timeline: the viz contract. The run emits it; the viz only plays it back.

export interface FrameObject {
  id: string;
  r: Vec3;
  v?: Vec3 | null; // ECI velocity km/s; optional, enables ghost-orbit extrapolation
}

export interface Frame {
  t: number; // sec since epoch
  objects: FrameObject[];
}

export type TimelineEventType =
  | "conjunction_detected"
  | "proposal"
  | "maneuver_committed"
  | "resolved"
  | "new_conjunction";

export interface TimelineEvent {
  t: number;
  type: TimelineEventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export interface Timeline {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: Record<string, any>;
  frames: Frame[];
  events: TimelineEvent[];
}
