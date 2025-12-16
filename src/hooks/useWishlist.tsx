import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import useAuth from './useAuth';

export default function useWishlist() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<string[]>([]); // activity ids

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('wishlists')
      .select('activity_id')
      .eq('user_id', user.id);
    setLoading(false);
    if (error) {
      console.error('Error fetching wishlist', error);
      return;
    }
    setItems((data || []).map((r: any) => r.activity_id));
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const add = async (activityId: string) => {
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('wishlists').insert([{ user_id: user.id, activity_id: activityId }]);
    if (error) throw error;
    setItems((s) => Array.from(new Set([...s, activityId])));
  };

  const remove = async (activityId: string) => {
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase.from('wishlists').delete().match({ user_id: user.id, activity_id: activityId });
    if (error) throw error;
    setItems((s) => s.filter((id) => id !== activityId));
  };

  const toggle = async (activityId: string) => {
    if (!user) throw new Error('Not authenticated');
    if (items.includes(activityId)) {
      await remove(activityId);
    } else {
      await add(activityId);
    }
  };

  return { items, loading, fetchWishlist, add, remove, toggle, isSaved: (id: string) => items.includes(id) };
}
